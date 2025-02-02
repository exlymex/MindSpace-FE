import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextInput, Text } from 'react-native-paper';
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

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            error={!!errors.email}
            style={styles.input}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!errors.password}
            style={styles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {error && (
        <Text style={styles.errorText}>
          {typeof error === 'string' ? error : 'An error occurred'}
        </Text>
      )}

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