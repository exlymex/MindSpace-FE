import {ViewStyle} from 'react-native';

import {Control, Controller, FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';
import {Item} from 'react-native-picker-select';

import {IListOption} from '@/types/custom';
import {Picker} from '@/components/common/Picker/Picker';

interface ControlledPickerProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    name: TName;
    control: Control<TFieldValues>;
    rules?: RegisterOptions;
    label: string;
    placeholder?: Partial<Item>;
    styleProp?: ViewStyle;
    items?: IListOption[];
    disabled?: boolean;
}

export const ControlledPicker = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
                                                                                                              name,
                                                                                                              control,
                                                                                                              rules,
                                                                                                              label,
                                                                                                              placeholder,
                                                                                                              items = [],
                                                                                                              disabled,
                                                                                                          }: ControlledPickerProps<TFieldValues, TName>) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}, fieldState}) => (
            <Picker
                items={items}
                value={value}
                onChange={onChange}
                label={label}
                error={fieldState.error?.message || ''}
                placeholder={placeholder}
                disabled={disabled}
            />
        )}
    />
);
