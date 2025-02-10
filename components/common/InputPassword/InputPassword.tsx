import {FC, useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStyles} from '@/hooks';

import {styles} from './styles.ts';

interface InputPasswordProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    error?: string;
    secureTextEntry?: boolean;
    styleProp?: ViewStyle;
    inputStyling?: StyleProp<TextStyle>;
}

export const InputPassword: FC<InputPasswordProps> = ({
                                                          placeholder,
                                                          secureTextEntry = false,
                                                          label,
                                                          error,
                                                          styleProp,
                                                          inputStyling,
                                                          ...props
                                                      }) => {
    const {s, theme} = useStyles(styles);
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(secureTextEntry);

    const inputStyle = [s.input, isFocused && s.inputTextFocused, !!error && s.errorTextInput, inputStyling];
    const inputPlaceholderText = props.value ? '' : placeholder;

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
                <HelperText type={error ? 'error' : 'info'} padding="none" style={[s.label, !!error && s.errorColor]}>
                    {label}
                </HelperText>
            ) : null}
            <View style={s.inputWrap}>
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={inputStyle}
                    placeholder={inputPlaceholderText}
                    placeholderTextColor={theme.colors.ezGrayDark}
                    {...props}
                    onFocus={onFocus}
                    onBlur={blurHandler}
                />
                <Icon
                    style={[s.showPasswordIcon, !hidePassword && s.showPasswordIconActive]}
                    name="eye-outline"
                    size={theme.scale(20)}
                    onPress={() => setHidePassword(!hidePassword)}
                />
            </View>

            {error !== 'hidden' ? (
                <HelperText style={[s.errorText, !!error && s.errorColor]} padding="none" type="error"
                            visible={!!error}>
                    {error}
                </HelperText>
            ) : null}
        </View>
    );
};
