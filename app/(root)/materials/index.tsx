import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import {useStyles} from '@/hooks';
import {CustomText, ErrorMessage, LoadingIndicator} from '@/components';
import {Card, Chip, Searchbar} from 'react-native-paper';
import {useGetCategoriesQuery, useGetMaterialsQuery} from '@/features/materials/api';
import {AppTheme} from '@/theme';

const styles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: theme.scale(16),
        backgroundColor: theme.colors.surface,
    },
    title: {
        marginBottom: theme.scale(16),
    },
    searchBar: {
        marginBottom: theme.scale(16),
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.scale(8),
        marginBottom: theme.scale(16),
    },
    chip: {
        marginRight: theme.scale(8),
        marginBottom: theme.scale(8),
    },
    content: {
        padding: theme.scale(16),
    },
    card: {
        marginBottom: theme.scale(16),
    },
    cardImage: {
        height: theme.scale(150),
    },
    cardContent: {
        padding: theme.scale(16),
    },
    categoryBadge: {
        backgroundColor: theme.colors.ezPrimaryLight,
        paddingHorizontal: theme.scale(8),
        paddingVertical: theme.scale(4),
        borderRadius: theme.scale(4),
        marginRight: theme.scale(8),
        marginBottom: theme.scale(8),
    },
    categoryBadgeText: {
        color: theme.colors.ezPrimary,
    },
    categoriesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: theme.scale(8),
    },
});

export default function MaterialsScreen() {
    const {s, theme} = useStyles(styles);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const {
        data: materials,
        isLoading: isLoadingMaterials,
        error: materialsError
    } = useGetMaterialsQuery(selectedCategoryId);

    const {
        data: categories,
        isLoading: isLoadingCategories,
        error: categoriesError
    } = useGetCategoriesQuery();

    const handleCategoryPress = (categoryId: string) => {
        setSelectedCategoryId(selectedCategoryId === categoryId ? null : categoryId);
    };

    const filteredMaterials = materials?.filter(material =>
        material.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoadingMaterials || isLoadingCategories) {
        return <LoadingIndicator/>;
    }

    if (materialsError || categoriesError) {
        return <ErrorMessage message="Помилка завантаження матеріалів"/>;
    }

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <CustomText variant="ezH3Semi" style={s.title}>
                    Матеріали для самопідтримки
                </CustomText>

                <Searchbar
                    placeholder="Пошук матеріалів"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={s.searchBar}
                />

                <View style={s.categoriesContainer}>
                    {categories?.map(category => (
                        <Chip
                            key={category.id}
                            selected={selectedCategoryId === category.id}
                            onPress={() => handleCategoryPress(category.id)}
                            style={s.chip}
                        >
                            {category.name}
                        </Chip>
                    ))}
                </View>
            </View>

            <FlatList
                data={filteredMaterials}
                contentContainerStyle={s.content}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Card
                        style={s.card}
                        onPress={() => router.push(`/materials/${item.id}`)}
                    >
                        {item.imageUrl && (
                            <Card.Cover
                                source={{uri: item.imageUrl}}
                                style={s.cardImage}
                            />
                        )}
                        <Card.Content style={s.cardContent}>
                            <CustomText variant="ezH4Semi">{item.title}</CustomText>
                            <CustomText variant="ezButtonMedium" numberOfLines={2}>
                                {item.content.substring(0, 100)}...
                            </CustomText>

                            <View style={s.categoriesRow}>
                                {item.categories.map(category => (
                                    <View key={category.id} style={s.categoryBadge}>
                                        <CustomText variant="ezCaptionMedium" style={s.categoryBadgeText}>
                                            {category.name}
                                        </CustomText>
                                    </View>
                                ))}
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
        </SafeAreaView>
    );
} 