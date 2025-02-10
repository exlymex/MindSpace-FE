import {FC} from 'react';
import {View} from 'react-native';

import {useStyles} from '@/hooks';

import {styles} from './styles';
import {CustomText} from "@/components";

interface IDisabledValueProps {
    value: string;
    label?: string;
}

const DisabledValue: FC<IDisabledValueProps> = ({value, label}) => {
    const {s} = useStyles(styles);
    return (
        <View style={s.container}>
            <CustomText variant="ezCaptionMedium" style={s.label}>
                {label}
            </CustomText>
            <CustomText variant="ezCaptionMedium" style={s.value}>
                {value}
            </CustomText>
        </View>
    );
};

export {DisabledValue};
