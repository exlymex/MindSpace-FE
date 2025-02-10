import {FC, useMemo, useState} from 'react';
import {View} from 'react-native';

import {HelperText} from 'react-native-paper';
import RNPickerSelect, {Item} from 'react-native-picker-select';

import {Arrow} from '@/assets';
import {getActiveItemLabel} from '@/helpers';
import {useStyles} from '@/hooks';
import {IListOption} from '@/types/custom';

import {DisabledValue} from '../DisabledValue/DisabledValue';
import {styles} from './styles';

interface IArrowIcon {
    isPickerOpen: boolean;
}

interface PickerProps {
    items: IListOption[];
    onChange: (value: string) => void;
    placeholder?: Partial<Item>;
    label: string;
    value: string;
    error?: string;
    disabled?: boolean;
}

const RotateIcon: FC<IArrowIcon> = ({isPickerOpen}) => (
    <Arrow style={{transform: [{rotate: isPickerOpen ? '180deg' : '0deg'}]}}/>
);
export const Picker: FC<PickerProps> = ({items, onChange, placeholder, value, error, label, disabled}) => {
    const {s} = useStyles(styles);
    const [isPickerOpen, setPickerOpen] = useState(false);
    const activeItemLabel = useMemo(() => getActiveItemLabel(value, items), [value, items]);

    if (disabled) {
        return <DisabledValue value={activeItemLabel} label={label}/>;
    }

    return (
        <View style={s.container}>
            <HelperText type={error ? 'error' : 'info'} padding="none" style={[s.label, !!error && s.errorColor]}>
                {label}
            </HelperText>

            <RNPickerSelect
                Icon={() => <RotateIcon isPickerOpen={isPickerOpen}/>}
                value={value}
                placeholder={placeholder}
                useNativeAndroidPickerStyle={false}
                style={{
                    iconContainer: s.iconContainer,
                    inputIOS: [s.pickerIos, error ? s.errorPicker : {}],
                    inputAndroid: [s.pickerIos, error ? s.errorPicker : {}],
                    placeholder: s.placeholder,
                }}
                onValueChange={value => onChange(value)}
                onOpen={() => setPickerOpen(true)}
                onClose={() => setPickerOpen(false)}
                items={items}
                disabled={disabled}
            />
            {error !== 'hidden' ? (
                <HelperText
                    style={[s.errorText, !!error && s.errorColor]}
                    padding="none"
                    type={error ? 'error' : 'info'}
                    visible={!!error}
                >
                    {error}
                </HelperText>
            ) : null}
        </View>
    );
};
