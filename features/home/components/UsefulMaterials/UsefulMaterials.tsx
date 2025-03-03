import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { 
  FadeInDown,
  useAnimatedStyle, 
  withSpring,
  withSequence,
  SlideInRight,
  ZoomIn
} from 'react-native-reanimated';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { CustomText } from '@/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Оновлені моковані дані з більш якісним контентом
const materials = [
  {
    id: '1',
    title: 'Як впоратися зі стресом',
    description: 'Практичні поради та вправи для подолання стресу в повсякденному житті',
    image: { uri: 'https://img.freepik.com/free-vector/anxiety-concept-illustration_114360-8074.jpg' },
    type: 'article'
  },
  {
    id: '2',
    title: 'Техніки медитації для початківців',
    description: 'Прості медитативні практики для покращення психічного здоров\'я',
    image: { uri: 'https://img.freepik.com/free-vector/meditation-concept-illustration_114360-7898.jpg' },
    type: 'video'
  },
  {
    id: '3',
    title: 'Емоційний інтелект',
    description: 'Як розвинути емоційний інтелект та покращити стосунки з оточуючими',
    image: { uri: 'https://img.freepik.com/free-vector/mental-health-awareness-concept_23-2148514643.jpg' },
    type: 'book'
  },
];

export const UsefulMaterials: FC = () => {
  const { s, theme } = useStyles(styles);
  const router = useRouter();

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
  }));

  const getIconName = (type: string) => {
    switch (type) {
      case 'video': return 'play-circle-outline';
      case 'book': return 'book-open-page-variant-outline';
      case 'podcast': return 'headphones';
      default: return 'file-document-outline';
    }
  };

  const handleMaterialPress = (id: string) => {
    // Навігація до деталей матеріалу
    router.push(`/materials/${id}`);
  };

  return (
    <Animated.View 
      entering={ZoomIn.duration(800)}
      style={s.container}
    >
      <CustomText variant="ezH4Semi" style={s.sectionTitle}>
        Корисні матеріали
      </CustomText>
      
      <View style={s.materialsContainer}>
        {materials.map((material, index) => (
          <AnimatedTouchableOpacity 
            key={material.id}
            entering={SlideInRight
              .delay(index * 200)
              .springify()
              .damping(12)}
            style={[s.materialCard, cardAnimatedStyle]}
            onPress={() => handleMaterialPress(material.id)}
            activeOpacity={0.8}
          >
            <Animated.Image 
              entering={FadeInDown.delay(index * 300).springify()}
              source={material.image} 
              style={s.materialImage} 
            />
            
            <View style={s.materialContent}>
              <View style={s.materialHeader}>
                <CustomText variant="ezSubtitleSemi" style={s.materialTitle} numberOfLines={2}>
                  {material.title}
                </CustomText>
              </View>
              
              <CustomText variant="ezSubtitleRegular" style={s.materialDescription} numberOfLines={2}>
                {material.description}
              </CustomText>
              
              <View style={s.materialFooter}>
                <View style={s.materialType}>
                  <MaterialCommunityIcons 
                    name={getIconName(material.type)} 
                    size={16} 
                    color={theme.colors.ezPrimary} 
                  />
                  <CustomText variant="ezCaptionMedium" style={s.materialTypeText}>
                    {material.type === 'article' ? 'Стаття' : 
                     material.type === 'video' ? 'Відео' : 
                     material.type === 'book' ? 'Книга' : 'Подкаст'}
                  </CustomText>
                </View>
                
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={20} 
                  color={theme.colors.ezPrimary} 
                />
              </View>
            </View>
          </AnimatedTouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
}; 