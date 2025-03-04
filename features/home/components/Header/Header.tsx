import React, {FC} from 'react';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {CustomText} from '@/components';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useRouter} from 'expo-router';
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface HeaderProps {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string | null;
}

export const Header: FC<HeaderProps> = ({firstName = 'Користувач', lastName = '', avatarUrl}) => {
    const {s, theme} = useStyles(styles);
    const router = useRouter();

    const handleProfilePress = () => {
        router.push('/(root)/(tabs)/profile');
    };

    return (
        <Animated.View
            entering={FadeIn.duration(1000)}
            style={s.container}
        >
            <View>
                <IconButton
                    icon={({size, color}) => (
                        avatarUrl ? (
                            <Animated.Image
                                source={{uri: avatarUrl}}
                                style={s.avatarImage}
                                entering={FadeIn.duration(500)}
                            />
                        ) : (
                            <MaterialCommunityIcons name="account-circle" size={size} color={color}/>
                        )
                    )}
                    iconColor={theme.colors.ezPrimary}
                    size={28}
                    onPress={handleProfilePress}
                    style={s.profileButton}
                />
            </View>
            <CustomText variant="ezH2Semi" style={s.greeting}>
                Вітаємо, {firstName} !
            </CustomText>
        </Animated.View>
    );
}; 