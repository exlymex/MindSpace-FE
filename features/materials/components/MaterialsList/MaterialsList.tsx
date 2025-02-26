import React, { FC, useState, useMemo } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { MaterialCard } from '../MaterialCard/MaterialCard';
import { mockMaterials } from '../../mockData';
import { Searchbar } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CustomText } from '@/components';

const categories = [
  { label: 'Всі', value: 'all' },
  { label: 'Тривожність', value: 'anxiety' },
  { label: 'Депресія', value: 'depression' },
  { label: 'Стрес', value: 'stress' },
  { label: 'Стосунки', value: 'relationships' },
  { label: 'Саморозвиток', value: 'self-development' },
];

export const MaterialsList: FC = () => {
  const { s } = useStyles(styles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMaterials = useMemo(() => {
    return mockMaterials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <View style={s.container}>
      <Searchbar
        placeholder="Пошук матеріалів"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={s.searchBar}
      />
      
      <View style={s.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.value;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.value)}
                style={[s.categoryButton, isSelected && s.selectedCategoryButton]}
                activeOpacity={0.7}
              >
                <CustomText
                  variant="bodyMedium"
                  style={[s.categoryText, isSelected && s.selectedCategoryText]}
                >
                  {item.label}
                </CustomText>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={s.categoriesList}
          bounces={false}
        />
      </View>

      <FlatList
        data={filteredMaterials}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 100)}>
            <MaterialCard material={item} />
          </Animated.View>
        )}
        contentContainerStyle={s.materialsList}
        ListEmptyComponent={
          <CustomText variant="ezSubtitleRegular" style={s.emptyText}>
            Матеріали не знайдено
          </CustomText>
        }
      />
    </View>
  );
}; 