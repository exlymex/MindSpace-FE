import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required("Email обов'язковий").email("Невірний формат email"),
  password: yup.string().required("Пароль обов'язковий"),
});

export const registerSchema = yup.object({
  username: yup.string().required('Імʼя користувача обовʼязкове'),
  email: yup.string().email('Невірний формат email').required('Email обовʼязковий'),
  password: yup.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .required('Пароль обовʼязковий'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження пароля обовʼязкове'),
  role: yup.string()
    .oneOf(['student', 'psychologist'], 'Оберіть роль')
    .required('Роль обовʼязкова')
}); 