import React, {FC, ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Checked} from '@/assets';
import {useStyles} from '@/hooks';

import {styles} from './styles.ts';
import {CustomText} from "@/components";

interface CheckboxProps {
    isChecked: boolean;
    onCheck: (value: boolean) => void;
    label?: string | ReactNode;
    placeholder: string;
}

export const CheckboxWithLabel: FC<CheckboxProps> = ({isChecked, onCheck, label, placeholder}) => {
    const {s} = useStyles(styles);

    return (
        <View style={s.container}>
            {label ? <CustomText variant="ezSubtitleSemi">{label}</CustomText> : null}
            <TouchableOpacity style={s.flex} onPress={() => onCheck(!isChecked)}>
                <CustomText variant="ezCaptionMedium">{placeholder}</CustomText>
                <View style={[s.checkbox, isChecked && s.checked]}>{isChecked && <Checked/>}</View>
            </TouchableOpacity>
        </View>
    );
};
