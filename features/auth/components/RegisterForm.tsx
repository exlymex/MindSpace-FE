import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {ControlledDatePicker, ControlledInput, ControlledPassword, ControlledPicker, CustomText} from "@/components";
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from '../validation';
import {RegisterFormData, RegisterRequestData} from '../types';
import {AppTheme} from '@/theme';
import {useStyles} from '@/hooks';

interface RegisterFormProps {
    onSubmit: (data: RegisterRequestData) => void;
    isLoading: boolean;
    error?: string;
}

export function RegisterForm({onSubmit, isLoading, error}: RegisterFormProps) {
    const {s, theme} = useStyles(styles);
    const {control, handleSubmit, watch} = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            role: 'student',
            first_name: '',
            last_name: '',
            phone_number: '',
            birth_date: new Date(),
        }
    });

    const selectedRole = watch('role');

    const handleFormSubmit = (data: RegisterFormData) => {
        const {confirmPassword, ...registerData} = data;
        onSubmit(registerData);
    };

    return (
        <View style={s.safeArea}>
            <ScrollView
                contentContainerStyle={s.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={s.formContainer}>
                    {/* Базові поля для всіх */}
                    <CustomText variant="ezSubtitleSemi" style={s.sectionTitle}>
                        Основна інформація
                    </CustomText>

                    <ControlledInput
                        label="Ім'я"
                        placeholder="Введіть ваше ім'я"
                        control={control}
                        name="first_name"
                    />

                    <ControlledInput
                        label="Прізвище"
                        placeholder="Введіть ваше прізвище"
                        control={control}
                        name="last_name"
                    />

                    <ControlledInput
                        label="Емейл"
                        placeholder="Введіть ваш емейл"
                        control={control}
                        name="email"
                        inputProps={{
                            keyboardType: 'email-address',
                            autoCapitalize: 'none',
                        }}
                    />

                    <ControlledInput
                        label="Телефон"
                        placeholder="Введіть ваш номер телефону"
                        control={control}
                        name="phone_number"
                        inputProps={{
                            keyboardType: 'phone-pad',
                        }}
                    />

                    <ControlledDatePicker
                        label="Дата народження"
                        control={control}
                        name="birth_date"
                        maximumDate={new Date()}
                    />

                    <ControlledPassword
                        label="Пароль"
                        placeholder="Введіть ваш пароль"
                        control={control}
                        name="password"
                    />

                    <ControlledPassword
                        label="Підтвердження пароля"
                        placeholder="Підтвердіть ваш пароль"
                        control={control}
                        name="confirmPassword"
                    />

                    <ControlledPicker
                        label="Роль"
                        name="role"
                        items={[
                            {label: 'Студент', value: 'student'},
                            {label: 'Психолог', value: 'psychologist'}
                        ]}
                        control={control}
                        placeholder={{label: "Оберіть роль", value: ""}}
                    />

                    {/* Умовні поля для психологів */}
                    {selectedRole === 'psychologist' && (
                        <>
                            <CustomText variant="ezSubtitleSemi" style={s.sectionTitle}>
                                Професійна інформація
                            </CustomText>

                            <ControlledInput
                                label="Освіта"
                                placeholder="Вкажіть вашу освіту"
                                control={control}
                                name="education"
                            />

                            <ControlledInput
                                label="Спеціалізація"
                                placeholder="Вкажіть вашу спеціалізацію"
                                control={control}
                                name="specialization"
                            />

                            <ControlledInput
                                label="Номер ліцензії"
                                placeholder="Вкажіть номер ліцензії"
                                control={control}
                                name="license_number"
                            />

                            <ControlledInput
                                label="Досвід роботи (років)"
                                placeholder="Вкажіть ваш досвід"
                                control={control}
                                name="experience_years"
                                inputProps={{keyboardType: 'numeric'}}
                            />
                        </>
                    )}

                    <Button
                        mode="contained"
                        onPress={handleSubmit(handleFormSubmit)}
                        loading={isLoading}
                        disabled={isLoading}
                        style={s.submitButton}
                    >
                        Зареєструватися
                    </Button>

                    {error && (
                        <CustomText variant="ezSubtitleRegular" style={s.errorText}>
                            {error}
                        </CustomText>
                    )}
                </View>
            </ScrollView>

        </View>
    );
}

const styles = (theme: AppTheme) =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        keyboardAvoidingView: {
            flex: 1,
        },
        scrollContent: {
            paddingTop: theme.scale(4),
            paddingBottom: theme.scale(8),
        },
        formContainer: {
            width: '100%',
        },
        sectionTitle: {
            marginTop: theme.scale(8),
            marginBottom: theme.scale(8),
            color: theme.colors.onBackground,
        },
        submitButton: {
            marginTop: theme.scale(16),
            marginBottom: theme.scale(4),
            borderRadius: theme.scale(8),
            paddingVertical: theme.scale(2),
        },
        errorText: {
            color: theme.colors.error,
            textAlign: 'center',
            marginTop: theme.scale(4),
        }
    });