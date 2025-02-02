import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { registerSchema } from '@/features/auth/validation';
import { useSignUpMutation, useSignUpAnonymouslyMutation } from '@/features/auth/api/authApi';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const theme = useTheme();
  const router = useRouter();
  
  const [signUp, { isLoading: isSigningUp, error: signUpError }] = useSignUpMutation();
  const [signUpAnonymously, { isLoading: isSigningUpAnonymously }] = useSignUpAnonymouslyMutation();
  
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp({ email: data.email, password: data.password }).unwrap();
      router.replace('/');
    } catch (error) {
      // Error is handled by RTK Query
    }
  };

  const handleAnonymousSignUp = async () => {
    try {
      await signUpAnonymously().unwrap();
      router.replace('/');
    } catch (error) {
      // Error is handled by RTK Query
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={styles.title}>Create Account</Text>
      
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Confirm Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={!!errors.confirmPassword}
            style={styles.input}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

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