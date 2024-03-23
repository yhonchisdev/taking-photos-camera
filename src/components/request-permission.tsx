import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {tcn} from '@/utils/tailwind';

type Props = {
  requestPermission: () => void;
};
function RequestPermission({requestPermission}: Props): JSX.Element {
  return (
    <View className="bg-white p-5 space-y-2 rounded-xl shadow-md shadow-black/25">
      <Text className="text-sm text-black text-center font-medium">
        You dont have permision to camera.
      </Text>
      <Pressable className="mx-auto" onPress={requestPermission}>
        {({pressed}): JSX.Element => (
          <View
            className={tcn('bg-black px-5 py-3 rounded-full', {
              'bg-black/80': pressed,
            })}>
            <Text className={tcn('text-sm text-white font-bold text-center')}>
              Request permission
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

export default RequestPermission;
