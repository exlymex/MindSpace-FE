import React, {FC, ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import {Modal, Portal} from 'react-native-paper';
import Animated from 'react-native-reanimated';

import {useStyles} from '@/hooks';

import {styles} from './styles';

interface AdaptiveModalProps {
    visible: boolean;
    onDismiss: () => void;
    children: ReactNode;
    contentContainerStyle?: StyleProp<ViewStyle>;
    animatedContainer?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}

export const CustomModal: FC<AdaptiveModalProps> = ({
                                                        visible,
                                                        onDismiss,
                                                        children,
                                                        contentContainerStyle,
                                                        animatedContainer,
                                                        style,
                                                    }) => {
    const {s} = useStyles(styles);

    return (
        <Portal>
            <Modal
                style={[s.modalStyle, style]}
                contentContainerStyle={contentContainerStyle}
                dismissable
                visible={visible}
                onDismiss={onDismiss}
            >
                <Animated.View style={[animatedContainer]}>{children}</Animated.View>
            </Modal>
        </Portal>
    );
};
