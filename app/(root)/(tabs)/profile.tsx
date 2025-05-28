import React, {useEffect, useState} from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native-paper';
import {CustomBadge, CustomText, ErrorMessage, LoadingIndicator} from '@/components';
import {useAppDispatch} from '@/store/store';
import {logoutAndResetState} from '@/store/slices/authSlice';
import {useRouter} from 'expo-router';
import {useGetCurrentUserQuery, useUpdateAvatarMutation, useUpdateUserMutation} from '@/features/auth/api/authApi';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import * as ImagePicker from 'expo-image-picker';
import {UserUpdate} from '@/features/auth/types';
import {useStyles} from '@/hooks';
import {AppTheme} from '@/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useForm} from 'react-hook-form';
import {ControlledInput} from '@/components/react-hook-form/ControlledInput/ControlledInput';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getFullAvatarUrl} from '@/utils/getFullAvatarUrl';


const profileSchema = yup.object({
    first_name: yup.string().required("Ім'я обов'язкове"),
    last_name: yup.string().required("Прізвище обов'язкове"),
    bio: yup.string().default(''),
    phone_number: yup.string().default(''),
    // Додаткові поля для психологів
    education: yup.string().when('$isПсихолог', {
        is: true,
        then: schema => schema.required('Освіта обов\'язкова для психологів'),
        otherwise: schema => schema
    }),
    specialization: yup.string().when('$isПсихолог', {
        is: true,
        then: schema => schema.required('Спеціалізація обов\'язкова для психологів'),
        otherwise: schema => schema
    }),
    license_number: yup.string().when('$isПсихолог', {
        is: true,
        then: schema => schema.required('Номер ліцензії обов\'язковий для психологів'),
        otherwise: schema => schema
    }),
    experience_years: yup.string().when('$isПсихолог', {
        is: true,
        then: schema => schema
            .required('Досвід роботи обов\'язковий для психологів')
            .matches(/^\d+$/, 'Досвід має бути числом'),
        otherwise: schema => schema
    }),
});

type ProfileFormData = {
    first_name: string;
    last_name: string;
    bio: string;
    phone_number: string;
    // Додаткові поля для психологів
    education?: string;
    specialization?: string;
    license_number?: string;
    experience_years?: string;
};

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {s, theme} = useStyles(styles);

    const {data: userData, isLoading, error, refetch} = useGetCurrentUserQuery();
    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();
    const [updateAvatar, {isLoading: isUpdatingAvatar}] = useUpdateAvatarMutation();

    const [avatarUrl, setAvatarUrl] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Налаштування React Hook Form
    const {control, handleSubmit, reset} = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            bio: '',
            phone_number: '',
            education: '',
            specialization: '',
            license_number: '',
            experience_years: '',
        },
        context: {
            isPsy: userData?.role === 'psychologist'
        }
    });

    // Заповнюємо форму даними користувача при завантаженні
    useEffect(() => {
        if (userData) {
            reset({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                bio: userData.bio || '',
                phone_number: userData.phone_number || '',
                education: userData.education || '',
                specialization: userData.specialization || '',
                license_number: userData.license_number || '',
                experience_years: userData.experience_years?.toString() || '',
            });
            setAvatarUrl(userData.avatar_url || '');
            if (userData.birth_date) {
                setBirthDate(new Date(userData.birth_date));
            }
        }
    }, [userData, reset]);

    const handleDateConfirm = (date: Date) => {
        setBirthDate(date);
        setShowDatePicker(false);
    };

    const handleDateCancel = () => {
        setShowDatePicker(false);
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Потрібен дозвіл', 'Потрібен дозвіл на доступ до галереї');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            try {
                // Створюємо FormData для відправки файлу
                const formData = new FormData();
                const fileUri = result.assets[0].uri;
                const fileName = fileUri.split('/').pop() || 'avatar.jpg';

                // @ts-ignore - FormData очікує специфічний тип, але ми знаємо, що це працює
                formData.append('avatar', {
                    uri: fileUri,
                    name: fileName,
                    type: 'image/jpeg',
                });

                // Відправляємо запит на оновлення аватара
                await updateAvatar(formData).unwrap();
                Alert.alert('Успіх', 'Аватар успішно оновлено');

                // Оновлюємо локальний стан і дані користувача
                setAvatarUrl(fileUri);
                refetch();
            } catch (error) {
                console.error('Error updating avatar:', error);
                Alert.alert('Помилка', 'Не вдалося оновити аватар');
            }
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        try {
            // Базові дані для оновлення
            const updateData: UserUpdate = {
                first_name: data.first_name,
                last_name: data.last_name,
                bio: data.bio,
                phone_number: data.phone_number,
                birth_date: birthDate.toISOString().split('T')[0],
            };

            // Додаємо поля для психологів, якщо користувач є психологом
            if (userData?.role === 'psychologist') {
                updateData.education = data.education;
                updateData.specialization = data.specialization;
                updateData.license_number = data.license_number;
                updateData.experience_years = data.experience_years ? parseInt(data.experience_years) : undefined;
            }

            await updateUser(updateData).unwrap();
            Alert.alert('Успіх', 'Профіль успішно оновлено');
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалося оновити профіль');
            console.error('Update error:', error);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Вихід',
            'Ви впевнені, що хочете вийти?',
            [
                {
                    text: 'Скасувати',
                    style: 'cancel',
                },
                {
                    text: 'Вийти',
                    onPress: () => {
                        dispatch(logoutAndResetState());
                        router.replace('/(auth)/login');
                    },
                    style: 'destructive',
                },
            ],
            {cancelable: true}
        );
    };

    if (isLoading) {
        return (
            <View style={s.loadingContainer}>
                <LoadingIndicator/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={s.errorContainer}>
                <ErrorMessage message="Не вдалося завантажити дані профілю"/>
                <Button mode="contained" onPress={refetch} style={s.retryButton}>
                    Спробувати знову
                </Button>
            </View>
        );
    }

    return (
        <SafeAreaView style={s.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={s.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={s.scrollContent}>
                    <View style={s.header}>
                        <CustomText variant="ezH3Semi" style={s.headerTitle}>
                            Мій профіль
                        </CustomText>
                    </View>

                    <View style={s.profileCard}>
                        <View style={s.avatarContainer}>
                            {avatarUrl ? (
                                <Image source={{uri: getFullAvatarUrl(avatarUrl)}} style={s.avatar}/>
                            ) : (
                                <View style={s.avatarPlaceholder}>
                                    <MaterialCommunityIcons name="account" size={80}
                                                            color={theme.colors.ezGrayDarkBackground}/>
                                </View>
                            )}

                            {userData?.role && (
                                <View style={s.badgeContainer}>
                                    <CustomBadge
                                        text={userData.role === 'psychologist' ? 'Психолог' : 'Студент'}
                                        backgroundColor={userData.role === 'psychologist' ? theme.colors.ezPrimary : theme.colors.secondary}
                                    />
                                </View>
                            )}

                            <TouchableOpacity onPress={handlePickImage} style={s.changeAvatarButton}>
                                <MaterialCommunityIcons name="camera" size={16} color={theme.colors.ezPrimary}/>
                                <CustomText variant="ezSubtitleSemi" style={s.changeAvatarText}>
                                    Змінити фото
                                </CustomText>
                            </TouchableOpacity>
                        </View>

                        <View style={s.form}>
                            <ControlledInput
                                name="first_name"
                                control={control}
                                label="Ім'я"
                                placeholder="Введіть ваше ім'я"
                                styleProp={s.input}
                                inputProps={{}}
                            />

                            <ControlledInput
                                name="last_name"
                                control={control}
                                label="Прізвище"
                                placeholder="Введіть ваше прізвище"
                                styleProp={s.input}
                                inputProps={{}}
                            />

                            <View style={s.datePickerContainer}>
                                <TouchableOpacity
                                    style={s.dateButton}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <View style={s.dateButtonContent}>
                                        <MaterialCommunityIcons name="calendar" size={24}
                                                                color={theme.colors.ezPrimary}/>
                                        <View style={s.dateTextContainer}>
                                            <CustomText variant="ezSubtitleRegular" style={s.dateLabel}>
                                                Дата народження
                                            </CustomText>
                                            <CustomText variant="ezSubtitleSemi" style={s.dateValue}>
                                                {format(birthDate, 'dd MMMM yyyy', {locale: uk})}
                                            </CustomText>
                                        </View>
                                        <MaterialCommunityIcons name="chevron-down" size={24}
                                                                color={theme.colors.ezGrayDark}/>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <DateTimePickerModal
                                isVisible={showDatePicker}
                                mode="date"
                                onConfirm={handleDateConfirm}
                                onCancel={handleDateCancel}
                                date={birthDate}
                                maximumDate={new Date()}
                                confirmTextIOS="Готово"
                                cancelTextIOS="Скасувати"
                                locale="uk"
                            />

                            <ControlledInput
                                name="phone_number"
                                control={control}
                                label="Номер телефону"
                                placeholder="Введіть ваш номер телефону"
                                styleProp={s.input}
                                inputProps={{
                                    keyboardType: "phone-pad",
                                }}
                            />

                            <ControlledInput
                                name="bio"
                                control={control}
                                label="Про мене"
                                placeholder="Розкажіть про себе"
                                styleProp={s.bioInput}

                            />
                        </View>

                        <Button
                            mode="contained"
                            onPress={handleSubmit(onSubmit)}
                            style={s.saveButton}
                            loading={isUpdating}
                        >
                            <CustomText variant="ezButtonMedium" style={s.buttonText}>
                                Зберегти зміни
                            </CustomText>
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={handleLogout}
                            style={s.logoutButton}
                        >
                            <CustomText variant="ezButtonMedium" style={s.logoutButtonText}>
                                Вийти з облікового запису
                            </CustomText>
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: theme.scale(16),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.scale(16),
    },
    retryButton: {
        marginTop: theme.scale(16),
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.scale(24),
    },
    headerTitle: {
        color: theme.colors.onBackground,
    },
    profileCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.scale(16),
        padding: theme.scale(24),
        elevation: 2,
        shadowColor: theme.colors.ezBlack,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: theme.scale(24),
    },
    avatar: {
        width: theme.scale(120),
        height: theme.scale(120),
        borderRadius: theme.scale(60),
        borderWidth: 3,
        borderColor: theme.colors.ezPrimary,
    },
    avatarPlaceholder: {
        width: theme.scale(120),
        height: theme.scale(120),
        borderRadius: theme.scale(60),
        backgroundColor: theme.colors.ezGrayBackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: theme.colors.ezPrimary,
    },
    badgeContainer: {
        position: 'absolute',
        top: 0,
        right: theme.scale(80),
    },
    changeAvatarButton: {
        marginTop: theme.scale(8),
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeAvatarText: {
        color: theme.colors.ezPrimary,
        marginLeft: theme.scale(4),
    },
    form: {
        marginBottom: theme.scale(24),
    },
    input: {
        marginBottom: theme.scale(16),
    },
    datePickerContainer: {
        marginBottom: theme.scale(16),
    },
    dateButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(4),
        backgroundColor: theme.colors.surface,
        overflow: 'hidden',
    },
    dateButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.scale(12),
    },
    dateTextContainer: {
        flex: 1,
        marginLeft: theme.scale(12),
    },
    dateLabel: {
        color: theme.colors.ezGrayDark,
        fontSize: theme.scale(12),
    },
    dateValue: {
        color: theme.colors.onBackground,
        marginTop: theme.scale(2),
    },
    bioInput: {},
    saveButton: {
        marginBottom: theme.scale(16),
        paddingVertical: theme.scale(8),
        borderRadius: theme.scale(8),
        backgroundColor: theme.colors.ezPrimary,
        elevation: 2,
        shadowColor: theme.colors.ezBlack,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    logoutButton: {
        marginBottom: theme.scale(24),
        paddingVertical: theme.scale(8),
        borderRadius: theme.scale(8),
        borderColor: theme.colors.ezRed,
        borderWidth: 1,
    },
    buttonText: {
        color: theme.colors.onPrimary,
    },
    logoutButtonText: {
        color: theme.colors.ezRed,
    },
}); 