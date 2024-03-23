import React, {useEffect} from 'react';
import {Text, Platform} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {tcn} from '@/utils/tailwind';

type Props = {
  count: number;
};
function CountSmall({count}: Props): JSX.Element {
  const opacity = useSharedValue<number>(0);

  useEffect(() => {
    opacity.value = withSpring(opacity.value + 1, {
      duration: 100,
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
        'items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm shadow-black/50',
        {
          'shadow-black/10': Platform.OS === 'ios',
        },
      )}>
      <Text className="text-sm text-black font-medium">{count}</Text>
    </Animated.View>
  );
}

export default CountSmall;
