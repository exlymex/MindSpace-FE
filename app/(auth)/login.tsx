import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {useSignInMutation} from '@/features/auth/api/authApi';
import {LoginForm} from '@/features/auth/components/LoginForm';
import {CustomText} from "@/components";
import {useAppDispatch} from "@/store/store.ts";
import {setAccessToken, setUser} from "@/store/slices/authSlice.ts";

export default function LoginScreen() {
    const router = useRouter();
    const [signIn, {isLoading, error}] = useSignInMutation();
    const dispatch = useAppDispatch();
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 70 : 0;

    const handleSubmit = async (data: { email: string; password: string }) => {
        try {
            const response = await signIn(data).unwrap();
            dispatch(setAccessToken(response.access_token));
            dispatch(setUser(response.user));

            // Перенаправляємо користувача залежно від ролі
            if (response.user.role === 'psychologist') {
                router.replace('/(root)/(psychologist-tabs)');
            } else {
                router.replace('/(root)/(tabs)');
            }
        } catch (error) {
            // Error is handled by RTK Query
        }
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior="padding"
            style={styles.wrapper}
        >
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <CustomText variant="ezH2Semi" style={styles.title}>
                        З поверненням
                    </CustomText>

                    <LoginForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        error={error?.data?.detail instanceof String ? error?.data?.detail : ""}
                    />

                    <Button
                        onPress={() => router.push('/+not-found')}
                        style={styles.textButton}
                    >
                        Забули пароль?
                    </Button>

                    <Button
                        onPress={() => router.push('/register')}
                        style={styles.textButton}
                    >
                        Ще не маєте акаунт? Зареєструватися
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formContainer: {
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
    },
    textButton: {
        marginTop: 8,
    },
}); 