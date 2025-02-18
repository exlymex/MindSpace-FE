import {FC, useMemo, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Picker as RNPicker} from '@react-native-picker/picker';
import {HelperText, Text} from 'react-native-paper';
import {getActiveItemLabel} from '@/helpers';
import {useStyles} from '@/hooks';
import {IListOption} from '@/types/custom';
import {DisabledValue} from '../DisabledValue/DisabledValue';
import {styles} from './styles';

interface PickerProps {
    items: IListOption[];
    onChange: (value: string) => void;
    placeholder?: { label: string; value: null };
    label: string;
    value: string;
    error?: string;
    disabled?: boolean;
}

export const Picker: FC<PickerProps> = ({items, onChange, placeholder, value, error, label, disabled}) => {
    const {s} = useStyles(styles);
    const [isVisible, setIsVisible] = useState(false);
    const activeItemLabel = useMemo(() => getActiveItemLabel(value, items), [value, items]);

    if (disabled) {
        return <DisabledValue value={activeItemLabel} label={label}/>;
    }

    return (
        <View style={s.container}>
            <HelperText type={error ? 'error' : 'info'} padding="none" style={[s.label, !!error && s.errorColor]}>
                {label}
            </HelperText>

            <TouchableOpacity 
                style={[s.pickerContainer, error ? s.errorPicker : {}]}
                onPress={() => setIsVisible(true)}
            >
                <Text style={s.pickerText}>
                    {activeItemLabel || placeholder?.label || 'Select...'}
                </Text>
            </TouchableOpacity>

            <Modal
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(false)}
                style={s.modal}
            >
                <View style={s.modalContent}>
                    <RNPicker
                        selectedValue={value}
                        onValueChange={(itemValue) => {
                            onChange(itemValue);
                            setIsVisible(false);
                        }}
                        style={s.picker}
                    >
                        {placeholder && (
                            <RNPicker.Item 
                                label={placeholder.label}
                                value={placeholder.value}
                            />
                        )}
                        {items.map((item) => (
                            <RNPicker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </RNPicker>
                </View>
            </Modal>

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
