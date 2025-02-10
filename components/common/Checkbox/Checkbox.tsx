import React, {FC, ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

import {Checked} from '@/assets';
import {useStyles} from '@/hooks';

import {styles} from './styles.ts';
import {CustomText} from "@/components";

interface CheckboxProps {
    isChecked: boolean;
    onCheck: (value: boolean) => void;
    label?: string | ReactNode;
    containerStyles?: StyleProp<ViewStyle>;
}

export const Checkbox: FC<CheckboxProps> = ({isChecked, onCheck, label, containerStyles}) => {
    const {s} = useStyles(styles);

    const handlePress = () => {
        const newState = !isChecked;
        onCheck(newState);
    };
    return (
        <TouchableOpacity style={[s.container]} onPress={handlePress}>
            <View style={[s.checkbox, isChecked && s.checked, containerStyles]}>{isChecked && <Checked/>}</View>
            {label ? <CustomText variant="ezSubtitleMedium">{label}</CustomText> : null}
        </TouchableOpacity>
    );
};
