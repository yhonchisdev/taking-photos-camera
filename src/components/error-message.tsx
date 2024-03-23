import React, {useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

type Props = {
  errorMessage: string;
};
function ErrorMessage({errorMessage}: Props): JSX.Element {
  const opacityError = useSharedValue<number>(0);

  useEffect(() => {
    opacityError.value = withSpring(opacityError.value + 1, {
      duration: 200,
    });
    setTimeout(() => {
      opacityError.value = withSpring(0);
    }, 1500);
    return () => {
      opacityError.value = withSpring(0);
    };
  }, [opacityError]);

  return (
    <Animated.View
      style={{opacity: opacityError}}
      className="absolute top-10 z-10 w-2/3 bg-red-500 rounded-lg px-5 py-2 shadow-md shadow-black/25">
      <Text className="text-sm text-white text-center font-medium">
        {errorMessage}
      </Text>
    </Animated.View>
  );
}

export default ErrorMessage;
