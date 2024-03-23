import React from 'react';
import {View, Text} from 'react-native';

function FindAnyCamera(): JSX.Element {
  return (
    <View className="bg-white p-5 space-y-2 rounded-xl shadow-md shadow-black/25">
      <Text className="text-sm text-black font-medium text-center">
        We did not find any camera
      </Text>
    </View>
  );
}

export default FindAnyCamera;
