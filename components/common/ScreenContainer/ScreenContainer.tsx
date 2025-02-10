import {FC, ReactNode} from 'react';
import {ScrollView, View, ViewStyle} from 'react-native';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Divider} from 'react-native-paper';

import {useStyles} from '@/hooks';
import {fontConfig} from '@/styles/fontConfig';

import {styles} from './styles';
import {CustomText} from "@/components";

interface ScreenContainerProps {
    title: string;
    children: ReactNode;
    alignLeft?: boolean;
    containerStyle?: ViewStyle;
    isBackButton?: boolean;
    isScrollView?: boolean;
    customBackAction?: () => void;
    leftActionIcon?: string;
    leftAction?: () => void;
    rightActionIcon?: string;
    rightAction?: () => void;
    rightActionElement?: JSX.Element;
    isDivider?: boolean;
    variantTitle?: keyof typeof fontConfig;
}

export const ScreenContainer: FC<ScreenContainerProps> = ({
                                                              title,
                                                              children,
                                                              containerStyle,
                                                              alignLeft,
                                                              isBackButton,
                                                              customBackAction,
                                                              leftActionIcon,
                                                              leftAction,
                                                              rightActionIcon,
                                                              rightAction,
                                                              rightActionElement,
                                                              isScrollView,
                                                              isDivider,
                                                              variantTitle,
                                                          }) => {
    const navigation = useNavigation<DrawerNavigationProp<never>>();
    const {s} = useStyles(styles);
    const onBack = () => {
        customBackAction ? customBackAction() : navigation.goBack();
    };

    const isNoLeftAction = !isBackButton && !leftActionIcon;

    return (
        <>
            <Appbar.Header style={[rightActionElement ? s.rightElement : null, s.header]}>
                {isBackButton ? <Appbar.BackAction accessibilityRole="button" onPress={onBack}/> : null}
                {leftActionIcon ? (
                    <Appbar.Action accessibilityRole="button" icon={leftActionIcon} onPress={leftAction}/>
                ) : null}
                <Appbar.Content
                    title={
                        <CustomText
                            variant={variantTitle ? variantTitle : 'ezH1Semi'}
                            style={[alignLeft && s.alignLeft, alignLeft && isNoLeftAction && s.marginLeft]}
                        >
                            {title}
                        </CustomText>
                    }
                />
                {rightActionIcon ? (
                    <Appbar.Action accessibilityRole="button" icon={rightActionIcon} onPress={rightAction}/>
                ) : null}
                {rightActionElement ? rightActionElement : null}
            </Appbar.Header>
            {isDivider ? <Divider bold/> : null}
            {isScrollView ? (
                <ScrollView style={s.container} contentContainerStyle={containerStyle}>
                    {children}
                </ScrollView>
            ) : (
                <View style={[s.container, containerStyle]}>{children}</View>
            )}
        </>
    );
};
