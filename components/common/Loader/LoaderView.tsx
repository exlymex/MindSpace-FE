import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, Easing, View} from 'react-native';

import {Loader} from '@/assets';
import {useStyles} from '@/hooks';

import {styles} from './styles';
import {CustomText} from "@/components";

interface LoaderProps {
    message?: string;
}

export const LoaderView: FC<LoaderProps> = ({message}) => {
    const {s} = useStyles(styles);
    const [isAnimating, setIsAnimating] = useState(false);
    const rotateAnim = useRef(new Animated.Value(1)).current;

    const ratateLeftParams = {
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    };

    useEffect(() => {
        if (!isAnimating) {
            setIsAnimating(true);
            Animated.loop(
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ).start();
        }
    }, [isAnimating]);

    const rotate = rotateAnim.interpolate(ratateLeftParams);

    return (
        <View style={s.loaderContainer}>
            <Animated.Image source={Loader} style={[s.loader, {transform: [{rotate}]}]}/>
            <View style={s.messageContainer}>
                <CustomText variant="ezH4Semi">{message}</CustomText>
            </View>
        </View>
    );
};
