import {CheckboxWithLabel} from '@/components/common/CheckboxWithLabel/CheckboxWithLabel';
import {Control, Controller, FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';

interface ControlledCheckboxProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
    name: TName;
    control: Control<TFieldValues>;
    rules?: RegisterOptions;
    label?: string;
    placeholder: string;
}

export const ControlledCheckbox = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
                                                                                                                name,
                                                                                                                control,
                                                                                                                rules,
                                                                                                                label,
                                                                                                                placeholder,
                                                                                                            }: ControlledCheckboxProps<TFieldValues, TName>) => (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
            <CheckboxWithLabel
                isChecked={!!value}
                onCheck={(value: boolean) => onChange(value)}
                label={label}
                placeholder={placeholder}
            />
        )}
    />
);
