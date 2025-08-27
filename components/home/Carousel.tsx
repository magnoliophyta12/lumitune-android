import { styles } from '@/styles/home/carousel';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Dimensions,
  Animated,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Carousel({ posters }: { posters: Array<Record<string, string>> }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % posters.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + posters.length) % posters.length);
  };

  useEffect(() => {
    if (posters.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [posters]);

  if (!Array.isArray(posters) || posters.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <View style={styles.carousel}>
          {posters.map((obj, index) => {
            const uri = Object.values(obj)[0];

            const position =
              index === activeIndex
                ? 'active'
                : index === (activeIndex + 1) % posters.length
                ? 'next'
                : index === (activeIndex - 1 + posters.length) % posters.length
                ? 'prev'
                : 'hidden';

            const transformStyle = getTransformStyle(position);

            return (
              <Animated.Image
                key={`${uri}_${index}`}  
                source={{ uri }}
                style={[styles.poster, transformStyle]}
                resizeMode="cover"
              />
            );
          })}
        </View>

        <View style={styles.dots}>
          {posters.map((obj, index) => {
            const uri = Object.values(obj)[0];
            return (
              <View
                key={`${uri}_dot_${index}`} 
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : null,
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const getTransformStyle = (position: string) => {
  switch (position) {
    case 'active':
      return {
        zIndex: 3,
        opacity: 1,
        transform: [{ scale: 1 }],
      };
    case 'next':
      return {
        zIndex: 2,
        opacity: 0.8,
        transform: [{ scale: 0.8 }, { translateX: SCREEN_WIDTH * 0.15 }],
      };
    case 'prev':
      return {
        zIndex: 1,
        opacity: 0.8,
        transform: [{ scale: 0.8 }, { translateX: -SCREEN_WIDTH * 0.15 }],
      };
    default:
      return {
        opacity: 0,
        zIndex: 0,
      };
  }
};


