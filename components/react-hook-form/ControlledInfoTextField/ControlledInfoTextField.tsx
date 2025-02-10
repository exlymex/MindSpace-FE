import {ReactNode} from 'react';
import {TextInputProps} from 'react-native';

import {Control, Controller, FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';
import {InfoTextField} from '@/components/common/InfoTextField/InfoTextField';

interface ControlledInfoTextFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    name: TName;
    control: Control<TFieldValues>;
    rules?: RegisterOptions;
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    inputProps?: TextInputProps;
    rightIcon?: ReactNode;
}

export const ControlledInfoTextField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
                                                                                                                     name,
                                                                                                                     control,
                                                                                                                     rules,
                                                                                                                     label,
                                                                                                                     placeholder = 'Type here',
                                                                                                                     secureTextEntry,
                                                                                                                     inputProps,
                                                                                                                     rightIcon,
                                                                                                                 }: ControlledInfoTextFieldProps<TFieldValues, TName>) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onBlur, onChange, value}, fieldState}) => (
            <InfoTextField
                {...inputProps}
                label={label}
                error={fieldState.error?.message || ''}
                value={value}
                onChangeText={onChange}
                rightIcon={rightIcon}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
            />
        )}
    />
);
