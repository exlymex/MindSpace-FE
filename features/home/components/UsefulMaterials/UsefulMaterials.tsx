import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, { 
  FadeInDown,
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withDelay,
  SlideInRight,
  BounceIn,
  ZoomIn
} from 'react-native-reanimated';
import { useStyles } from '@/hooks';
import { styles } from './styles.ts';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

const materials = [
  {
    id: '1',
    title: 'Як впоратися зі стресом',
    description: 'Практичні поради для подолання стресу',
    image: { uri: 'https://img.freepik.com/free-vector/anxiety-concept-illustration_114360-8074.jpg' },
  },
  {
    id: '2',
    title: 'Техніки медитації',
    description: 'Прості медитативні практики',
    image: { uri: 'https://img.freepik.com/free-vector/meditation-concept-illustration_114360-7898.jpg' },
  },
  // Додайте більше матеріалів за потреби
];

export const UsefulMaterials: FC = () => {
  const { s, theme } = useStyles(styles);
  const navigation = useNavigation();

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        scale: withSequence(
          withSpring(1.02),
          withSpring(1)
        )
      }
    ],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { 
        translateY: withSpring(0, {
          damping: 12,
          stiffness: 100
        })
      }
    ],
    opacity: withSpring(1)
  }));

  return (
    <Animated.View 
      entering={ZoomIn.duration(1000)}
      style={s.container}
    >
      <AnimatedText 
        entering={BounceIn.duration(1000)}
        style={[s.title, titleAnimatedStyle]}
      >
        Корисні матеріали
      </AnimatedText>
      <View style={s.materialsContainer}>
        {materials.map((material, index) => (
          <AnimatedTouchableOpacity 
            key={material.id}
            entering={SlideInRight
              .delay(index * 400)
              .springify()
              .damping(12)}
            style={[s.materialCard, cardAnimatedStyle]}
            onPress={() => {
              // Анімація при натисканні
              cardAnimatedStyle.value = withSequence(
                withSpring(0.95),
                withSpring(1)
              );
              navigation.navigate('Material', { id: material.id });
            }}
          >
            <Animated.Image 
              entering={FadeInDown.delay(index * 500).springify()}
              source={material.image} 
              style={s.materialImage} 
            />
            <View style={s.materialContent}>
              <AnimatedText 
                entering={FadeInDown.delay(index * 600)}
                style={s.materialTitle}
              >
                {material.title}
              </AnimatedText>
              <AnimatedText 
                entering={FadeInDown.delay(index * 700)}
                style={s.materialDescription}
              >
                {material.description}
              </AnimatedText>
            </View>
          </AnimatedTouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
}; 