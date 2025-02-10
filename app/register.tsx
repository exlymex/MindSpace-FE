import {StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Text, useTheme} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {registerSchema} from '@/features/auth/validation';
import {useSignUpAnonymouslyMutation, useSignUpMutation} from '@/features/auth/api/authApi';
import {ControlledInput, ControlledPassword} from "@/components";
import React from "react";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterScreen() {
    const theme = useTheme();
    const router = useRouter();

    const [signUp, {isLoading: isSigningUp, error: signUpError}] = useSignUpMutation();
    const [signUpAnonymously, {isLoading: isSigningUpAnonymously}] = useSignUpAnonymouslyMutation();

    const {control, handleSubmit,} = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await signUp({email: data.email, password: data.password}).unwrap();
            router.replace('/login');
        } catch (error) {
            // Error is handled by RTK Query
        }
    };

    const handleAnonymousSignUp = async () => {
        try {
            await signUpAnonymously().unwrap();
            // router.replace('/');
        } catch (error) {
            // Error is handled by RTK Query
        }
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

            <ControlledInput placeholder="Enter your email" control={control} name="email"/>
            <ControlledPassword placeholder="Enter your password" control={control} name="password"/>
            <ControlledPassword placeholder="Confirm your password" control={control} name="confirmPassword"/>

            {signUpError ? (
                <Text style={styles.errorText}>
                    Something went wrong
                </Text>
            ) : null}

            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={isSigningUp}
                style={styles.button}
            >
                Sign Up
            </Button>

            <Button
                mode="outlined"
                onPress={handleAnonymousSignUp}
                loading={isSigningUpAnonymously}
                style={styles.button}
            >
                Continue as Guest
            </Button>

            <Button
                onPress={() => router.push('/login')}
                style={styles.textButton}
            >
                Already have an account? Sign In
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
    input: {
        marginBottom: 8,
    },
    button: {
        marginTop: 16,
    },
    textButton: {
        marginTop: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
}); 