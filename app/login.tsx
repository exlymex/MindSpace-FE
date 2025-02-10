import {StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {useSignInMutation} from '@/features/auth/api/authApi';
import {LoginForm} from '@/features/auth/components/LoginForm';
import {CustomText} from "@/components";

export default function LoginScreen() {
    const theme = useTheme();
    const router = useRouter();
    const [signIn, {isLoading, error}] = useSignInMutation();

    const handleSubmit = async (data: { email: string; password: string }) => {
        try {
            await signIn(data).unwrap();
            router.replace('/');
        } catch (error) {
            // Error is handled by RTK Query
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>

            <CustomText variant="ezH2Semi" style={styles.title}>Welcome Back</CustomText>

            <LoginForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error as string}
            />

            <Button
                onPress={() => router.push('/forgot-password')}
                style={styles.textButton}
            >
                Forgot Password?
            </Button>

            <Button
                onPress={() => router.push('/register')}
                style={styles.textButton}
            >
                Don't have an account? Sign Up
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
    },
    textButton: {
        marginTop: 8,
    },
    themeToggle: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
}); 