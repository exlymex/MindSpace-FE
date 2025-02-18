import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {ControlledInput, ControlledPassword, ControlledPicker, CustomText} from "@/components";
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from '../validation';
import {RegisterFormData, RegisterRequestData} from '../types';

type RegisterFormProps = {
    onSubmit: (data: RegisterRequestData) => Promise<void>;
    isLoading?: boolean;
    error?: string;
};

export function RegisterForm({onSubmit, isLoading, error}: RegisterFormProps) {
    const {control, handleSubmit} = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'student'
        }
    });

    const handleFormSubmit = (data: RegisterFormData) => {
        const {confirmPassword, ...registerData} = data;
        onSubmit(registerData);
    };

    return (
        <View>
            <ControlledInput 
                label="Ім'я користувача" 
                placeholder="Введіть ваше ім'я" 
                control={control} 
                name="username"
            />
            <ControlledInput 
                label="Емейл" 
                placeholder="Введіть ваш емейл" 
                control={control} 
                name="email"
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
                placeholder={{ label: "Оберіть роль", value: "" }}
            />
            {error ? (
                <CustomText style={styles.errorText}>
                    {error}
                </CustomText>
            ) : null}
            <Button
                mode="contained"
                onPress={handleSubmit(handleFormSubmit)}
                loading={isLoading}
                style={styles.button}
            >
                Зареєструватися
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
}); 