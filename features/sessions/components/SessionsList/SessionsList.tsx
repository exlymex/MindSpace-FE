import React, {FC, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, TouchableOpacity, View} from 'react-native';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {SessionCard} from '../SessionCard/SessionCard';
import {CustomText} from '@/components';
import {Button} from 'react-native-paper';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useRouter} from 'expo-router';
import {useGetSessionsQuery} from '@/features/sessions/api';
import {BookSessionModal} from '../BookSessionModal/BookSessionModal';

const tabs = [
    {label: 'Всі', value: 'all'},
    {label: 'Заплановані', value: 'upcoming'},
    {label: 'Завершені', value: 'completed'},
    {label: 'Скасовані', value: 'cancelled'},
];

export const SessionsList: FC = () => {
    const {s, theme} = useStyles(styles);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');
    const [showBookModal, setShowBookModal] = useState(false);

    const {data: sessions, isLoading, error} = useGetSessionsQuery();

    const filteredSessions = useMemo(() => {
        if (!sessions) return [];

        if (activeTab === 'all') {
            return sessions;
        }
        return sessions.filter(session => session.status === activeTab);
    }, [activeTab, sessions]);

    if (isLoading) {
        return (
            <View style={[s.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator size="large" color={theme.colors.ezPrimary}/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[s.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <CustomText variant="ezSubtitleRegular" style={{color: theme.colors.ezError}}>
                    Помилка завантаження сесій
                </CustomText>
                <Button
                    mode="contained"
                    onPress={() => router.push('/book-session')}
                    style={s.bookButton}
                >
                    Забронювати нову сесію
                </Button>
            </View>
        );
    }

    return (
        <View style={s.container}>
            <View style={s.tabsContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.value}
                        style={[s.tab, activeTab === tab.value && s.activeTab]}
                        onPress={() => setActiveTab(tab.value)}
                    >
                        <CustomText
                            variant="ezSubtitleMedium"
                            style={[s.tabText, activeTab === tab.value && s.activeTabText]}
                        >
                            {tab.label}
                        </CustomText>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredSessions}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <Animated.View
                        entering={FadeInDown.delay(index * 100)}
                        style={s.cardWrapper}
                    >
                        <SessionCard session={item}/>
                    </Animated.View>
                )}
                contentContainerStyle={s.sessionsList}
                ListEmptyComponent={
                    <CustomText variant="ezSubtitleRegular" style={s.emptyText}>
                        Сесії не знайдено
                    </CustomText>
                }
            />

            <Button
                mode="contained"
                onPress={() => setShowBookModal(true)}
                style={s.bookButton}
            >
                Забронювати нову сесію
            </Button>

            <BookSessionModal
                visible={showBookModal}
                onClose={() => setShowBookModal(false)}
            />
        </View>
    );
}; 