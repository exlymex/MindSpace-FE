import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from 'react-native-paper';
import {loginSchema} from '../validation';
import {ControlledInput, ControlledPassword, CustomText} from "@/components";

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
    });

    return (
        <View>
            <ControlledInput placeholder="Enter your email" control={control} name="email"/>
            <ControlledPassword placeholder="Enter your password" control={control} name="password"/>
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
                Sign In
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