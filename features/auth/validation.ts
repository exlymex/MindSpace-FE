import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Невірний формат email').required('Email обовʼязковий'),
  password: yup.string().required('Пароль обовʼязковий'),
});

export const registerSchema = yup.object({
  email: yup.string().email('Невірний формат email').required('Email обовʼязковий'),
  password: yup.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .required('Пароль обовʼязковий'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Паролі не співпадають')
    .required('Підтвердження пароля обовʼязкове'),
  role: yup.string()
    .oneOf(['student', 'psychologist'], 'Оберіть роль')
    .required('Роль обовʼязкова'),
  first_name: yup.string().required("Ім'я обов'язкове"),
  last_name: yup.string().required("Прізвище обов'язкове"),
  phone_number: yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Невірний формат номера телефону')
    .required('Номер телефону обов\'язковий'),
  birth_date: yup.date()
    .max(new Date(), 'Дата народження не може бути в майбутньому')
    .required('Дата народження обов\'язкова'),
  education: yup.string().when('role', {
    is: 'psychologist',
    then: schema => schema.required('Освіта обов\'язкова для психологів')
  }),
  specialization: yup.string().when('role', {
    is: 'psychologist',
    then: schema => schema.required('Спеціалізація обов\'язкова для психологів')
  }),
  license_number: yup.string().when('role', {
    is: 'psychologist',
    then: schema => schema.required('Номер ліцензії обов\'язковий для психологів')
  }),
  experience_years: yup.number().when('role', {
    is: 'psychologist',
    then: schema => schema.min(0, 'Досвід не може бути від\'ємним').required('Досвід роботи обов\'язковий')
  }),
}); 