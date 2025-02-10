import {FC, ReactNode, useState} from 'react';
import {
    NativeSyntheticEvent,
    StyleProp,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import {HelperText} from 'react-native-paper';

import {useStyles} from '@/hooks';

import {styles} from './styles.ts';

interface InputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    error?: string;
    secureTextEntry?: boolean;
    styleProp?: ViewStyle;
    inputStyling?: StyleProp<TextStyle>;
    rightIcon?: ReactNode;
    readOnly?: boolean;
}

export const Input: FC<InputProps> = ({
                                          placeholder,
                                          secureTextEntry = false,
                                          label,
                                          error,
                                          styleProp,
                                          inputStyling,
                                          rightIcon,
                                          readOnly,
                                          ...props
                                      }) => {
    const {s, theme} = useStyles(styles);
    const [isFocused, setIsFocused] = useState(false);

    const blurHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        props.onBlur && props.onBlur(e);
    };
    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        props.onFocus && props.onFocus(e);
    };
    return (
        <View style={[s.inputContainer, styleProp]}>
            {label ? (
                <HelperText
                    type={error && error !== 'hidden' ? 'error' : 'info'}
                    padding="none"
                    style={[s.label, error && error !== 'hidden' ? s.errorColor : undefined]}
                >
                    {label}
                </HelperText>
            ) : null}

            <TextInput
                {...props}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
                style={[
                    s.input,
                    isFocused && s.inputTextFocused,
                    error && error !== 'hidden' ? s.errorTextInput : undefined,
                    inputStyling,
                    readOnly && s.readOnly,
                ]}
                placeholder={props.value ? '' : placeholder}
                placeholderTextColor={theme.colors.ezGrayDark}
                readOnly={readOnly}
                onFocus={onFocus}
                onBlur={blurHandler}
            />
            {error !== 'hidden' ? (
                <HelperText style={[s.errorText, !!error && s.errorColor]} padding="none" type="error"
                            visible={!!error}>
                    {error}
                </HelperText>
            ) : null}
            {rightIcon ? <View style={s.rightIconContainer}>{rightIcon}</View> : null}
        </View>
    );
};
