import {TextInputProps, ViewStyle} from 'react-native';

import {Control, Controller, FieldPath, FieldValues} from 'react-hook-form';
import {InputPassword} from '@/components/common/InputPassword/InputPassword';


interface ControlledInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    name: TName;
    control: Control<TFieldValues>;
    label?: string;
    placeholder?: string;
    styleProp?: ViewStyle;
    secureTextEntry?: boolean;
    inputProps?: TextInputProps;
    rightIcon?: React.ReactNode;
}

export const ControlledPassword = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
                                                                                                                name,
                                                                                                                control,
                                                                                                                label,
                                                                                                                placeholder = 'Type here',
                                                                                                                styleProp = {},
                                                                                                                secureTextEntry = true,
                                                                                                                inputProps,
                                                                                                            }: ControlledInputProps<TFieldValues, TName>) => (
    <Controller
        name={name}
        control={control}
        render={({field: {onBlur, onChange, value}, fieldState}) => (
            <InputPassword
                {...inputProps}
                styleProp={styleProp}
                label={label}
                error={fieldState.error?.message || ''}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        )}
    />
);
