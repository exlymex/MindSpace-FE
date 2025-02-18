import React from 'react';
import { StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {ControlledInput, ControlledPassword, ControlledPicker, CustomText} from "@/components";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation';

type LoginFormData = {
    email: string;
    password: string;
};

type LoginFormProps = {
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading?: boolean;
    error?: string;
};

export function LoginForm({onSubmit, isLoading, error}: LoginFormProps) {
    const {control, handleSubmit} = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    return (
        <View>
            <ControlledInput label="Емейл" placeholder="Введіть ваш емейл" control={control} name="email"/>
            <ControlledPassword label="Пароль" placeholder="Введіть ваш пароль" control={control} name="password"/>
        
            {error ? (
                <CustomText style={styles.errorText}>
                    {error}
                </CustomText>
            ) : null}
            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                style={styles.button}
            >
                Увійти
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 8,
    },
    button: {
        marginTop: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
}); 