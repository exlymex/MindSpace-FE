import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: unknown;
};

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit({ email, password });
  };

  return (
    <View>
      {/* ... other JSX */}
      
      {error && (
        <Text style={styles.errorText}>
          {error && typeof error === 'string' ? error : 'An error occurred'}
        </Text>
      )}

      {/* ... other JSX */}
    </View>
  );
} 