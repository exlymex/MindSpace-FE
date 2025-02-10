import {TextInputProps, ViewStyle} from 'react-native';

import {Control, Controller, FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';
import {Input} from '@/components/common/Input/Input';

interface ControlledInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    name: TName;
    control: Control<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    placeholder?: string;
    styleProp?: ViewStyle;
    secureTextEntry?: boolean;
    inputProps?: TextInputProps;
    rightIcon?: React.ReactNode;
}

export const ControlledInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
                                                                                                             name,
                                                                                                             control,
                                                                                                             rules,
                                                                                                             label,
                                                                                                             placeholder = 'Type here',
                                                                                                             styleProp = {},
                                                                                                             secureTextEntry,
                                                                                                             inputProps,
                                                                                                             rightIcon,
                                                                                                         }: ControlledInputProps<TFieldValues, TName>) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onBlur, onChange, value}, fieldState}) => (
            <Input
                styleProp={styleProp}
                label={label}
                error={fieldState.error?.message || ''}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                rightIcon={rightIcon}
                {...inputProps}
            />
        )}
    />
);
