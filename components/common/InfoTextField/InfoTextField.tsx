import {FC, useState} from 'react';
import {NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps, View} from 'react-native';
import {HelperText} from 'react-native-paper';

import {useStyles} from '@/hooks';

import {styles} from './styles.ts';
import {CustomText} from "@/components";

interface InfoTextFieldProps extends TextInputProps {
    label: string;
    value: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    rightIcon?: React.ReactNode;
}

const InfoTextField: FC<InfoTextFieldProps> = ({
                                                   label,
                                                   value,
                                                   placeholder,
                                                   error,
                                                   disabled,
                                                   keyboardType,
                                                   rightIcon,
                                                   ...props
                                               }) => {
    const {s} = useStyles(styles);
    const [isFocused, setIsFocused] = useState(false);
    const blurHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        props.onBlur && props?.onBlur?.(e);
    };

    return (
        <View style={s.container}>
            <CustomText variant="ezSubtitleMedium">{label}</CustomText>
            <TextInput
                {...props}
                autoCapitalize="none"
                autoCorrect={false}
                value={value.toString()}
                style={[s.input, isFocused && s.inputTextFocused, !!error && s.errorTextInput]}
                onFocus={() => setIsFocused(true)}
                onBlur={blurHandler}
                placeholder={placeholder || ''}
                editable={!disabled}
                keyboardType={keyboardType || 'default'}
            />
            {rightIcon ? <View style={s.rightIconContainer}>{rightIcon}</View> : null}
            {error ? (
                <HelperText style={[s.errorText, !!error && s.errorColor]} padding="none" type="error"
                            visible={!!error}>
                    {error}
                </HelperText>
            ) : null}
        </View>
    );
};

export {InfoTextField};
