import React from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useRouter} from 'expo-router';
import {useSignUpMutation} from '@/features/auth/api/authApi';
import {CustomText} from "@/components";
import {RegisterForm} from '@/features/auth/components/RegisterForm';
import {RegisterRequestData} from '@/features/auth/types';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const router = useRouter();
    const [signUp, {isLoading: isSigningUp, error: signUpError}] = useSignUpMutation();

    const onSubmit = async (data: RegisterRequestData) => {
        try {
            await signUp(data).unwrap();
            Alert.alert('Успіх', 'Реєстрація пройшла успішно!', [
                {text: 'OK', onPress: () => router.replace('/login')}
            ]);
        } catch (error: any) {
            Alert.alert(
                'Помилка',
                error.data?.message || 'Щось пішло не так. Спробуйте ще раз.',
                [{text: 'OK'}]
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? undefined : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <CustomText variant="ezH2Semi" style={styles.title}>
                        Створити акаунт
                    </CustomText>

                    <RegisterForm
                        onSubmit={onSubmit}
                        isLoading={isSigningUp}
                        error={signUpError?.data?.detail}
                    />

                    <Button
                        onPress={() => router.push('/login')}
                        style={styles.textButton}
                    >
                        Вже маєте акаунт? Увійти
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
    },
    title: {
        textAlign: 'center',
        marginBottom: 12,
        marginTop: 8,
    },
    textButton: {
        marginBottom: 8,
    },
}); 