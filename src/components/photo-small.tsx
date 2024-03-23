import React, {useEffect} from 'react';
import {Image, Platform} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {tcn} from '@/utils/tailwind';

type Props = {
  index: number;
  photo: string;
};
function PhotoSmall({index, photo}: Props): JSX.Element {
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
    <Animated.View
      style={{
        opacity,
      }}
      className={tcn(
        'absolute bottom-3 w-9 h-12 rounded-md bg-white shadow-md shadow-black/50 p-0.5',
        {
          'shadow-black/20': Platform.OS === 'ios',
          'left-1': index === 0,
          'left-3.5 -z-10 rotate-12': index === 1,
          'left-7 -z-20 rotate-45': index === 2,
        },
      )}>
      <Image
        className="w-full h-full bg-gray-200 object-cover rounded-md"
        source={{
          uri: photo,
        }}
      />
    </Animated.View>
  );
}

export default PhotoSmall;
