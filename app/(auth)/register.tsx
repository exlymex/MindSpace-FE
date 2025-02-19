import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {useSignUpMutation} from '@/features/auth/api/authApi';
import {CustomText} from "@/components";
import {RegisterForm} from '@/features/auth/components/RegisterForm';
import {RegisterRequestData} from '@/features/auth/types';

export default function RegisterScreen() {
    const router = useRouter();
    const [signUp, {isLoading: isSigningUp, error: signUpError}] = useSignUpMutation();

    const onSubmit = async (data: RegisterRequestData) => {
        try {
            await signUp(data).unwrap();
            Alert.alert('Успіх', 'Реєстрація пройшла успішно!', [
                { text: 'OK', onPress: () => router.replace('/login') }
            ]);
        } catch (error: any) {
            Alert.alert(
                'Помилка',
                error.data?.message || 'Щось пішло не так. Спробуйте ще раз.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <CustomText variant="ezH2Semi" style={styles.title}>
                Створити акаунт
            </CustomText>

            <RegisterForm 
                onSubmit={onSubmit}
                isLoading={isSigningUp}
                error={signUpError?.data?.message}
            />

            <Button
                onPress={() => router.push('/login')}
                style={styles.textButton}
            >
                Вже маєте акаунт? Увійти
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
        marginBottom: 24,
    },
    textButton: {
        marginTop: 8,
    },
}); 