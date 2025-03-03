import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useStyles } from '@/hooks';
import { CustomText, LoadingIndicator, ErrorMessage } from '@/components';
import { IconButton } from 'react-native-paper';
import { useGetMaterialByIdQuery } from '@/features/materials/api';
import { AppTheme } from '@/theme';
import Markdown from 'react-native-markdown-display';

const styles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.scale(16),
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ezGrayBackground,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: theme.scale(40),
  },
  content: {
    padding: theme.scale(16),
  },
  image: {
    width: '100%',
    height: theme.scale(200),
    borderRadius: theme.scale(8),
    marginBottom: theme.scale(16),
  },
  categoryBadge: {
    backgroundColor: theme.colors.ezPrimaryLight,
    paddingHorizontal: theme.scale(8),
    paddingVertical: theme.scale(4),
    borderRadius: theme.scale(4),
    marginRight: theme.scale(8),
    marginBottom: theme.scale(16),
  },
  categoryBadgeText: {
    color: theme.colors.ezPrimary,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.scale(8),
    marginBottom: theme.scale(16),
  },
  markdownContainer: {
    marginTop: theme.scale(16),
  },
});

export default function MaterialDetailScreen() {
  const { s, theme } = useStyles(styles);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const { 
    data: material, 
    isLoading, 
    error 
  } = useGetMaterialByIdQuery(id);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error || !material) {
    return <ErrorMessage message="Помилка завантаження матеріалу" />;
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <CustomText variant="ezH4Semi" style={s.title}>
          Матеріал
        </CustomText>
        <View style={{ width: theme.scale(40) }} />
      </View>

      <ScrollView style={s.content}>
        <CustomText variant="ezH3Semi">{material.title}</CustomText>
        
        <View style={s.categoriesRow}>
          {material.categories.map(category => (
            <View key={category.id} style={s.categoryBadge}>
              <CustomText variant="ezCaptionMedium" style={s.categoryBadgeText}>
                {category.name}
              </CustomText>
            </View>
          ))}
        </View>
        
        {material.imageUrl && (
          <Image 
            source={{ uri: material.imageUrl }} 
            style={s.image}
            resizeMode="cover"
          />
        )}
        
        <View style={s.markdownContainer}>
          <Markdown>{material.content}</Markdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 