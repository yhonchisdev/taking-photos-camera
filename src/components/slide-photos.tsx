import React, {useEffect} from 'react';
import {View, Image, Pressable, ViewStyle} from 'react-native';
import * as Solid from 'react-native-heroicons/solid';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {tcn} from '@/utils/tailwind';

type Props = {
  photos: string[];
  handleRemovePhoto: (i: number) => void;
};
function SlidePhotos({photos, handleRemovePhoto}: Props): JSX.Element {
  const opacity = useSharedValue<number>(0);

  useEffect(() => {
    opacity.value = withSpring(opacity.value + 1, {
      duration: 600,
    });
    return () => {
      opacity.value = withSpring(0);
    };
  }, [opacity]);

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 16} as ViewStyle}
      style={{opacity}}
      className="absolute bottom-36 z-10 w-full space-x-2">
      {photos.map((photo: string, index: number): JSX.Element => {
        return (
          <View key={index} className="w-20 h-20 bg-gray-100">
            <Pressable
              onPress={() => handleRemovePhoto(index)}
              className="absolute top-0.5 right-0.5 z-10">
              {({pressed}): JSX.Element => (
                <View
                  className={tcn(
                    'items-center justify-center w-6 h-6 rounded-full bg-white shadow-md shadow-black/25',
                    {
                      'scale-90': pressed,
                    },
                  )}>
                  <Solid.XMarkIcon size={17} fill="black" />
                </View>
              )}
            </Pressable>
            <Image
              className="w-full h-full bg-gray-200 object-cover"
              source={{
                uri: photo,
              }}
            />
          </View>
        );
      })}
    </Animated.ScrollView>
  );
}

export default SlidePhotos;
