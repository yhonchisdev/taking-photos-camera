import React from 'react';
import {View, Text, Pressable} from 'react-native';
import * as Solid from 'react-native-heroicons/solid';
import {tcn} from '@/utils/tailwind';

type Props = {
  handleChangePosition: (i: 'front' | 'back') => () => void;
  position: 'front' | 'back';
  handleChangeFlash: (i: 'on' | 'off') => () => void;
  flash: 'on' | 'off';
  handleToogleSound: () => void;
  sound: boolean;
  fps: number | undefined;
  handleTogglePhotoHdr: () => void;
  photoHdr: boolean;
};
function FloatMenu({
  handleChangePosition,
  position,
  handleChangeFlash,
  flash,
  handleToogleSound,
  sound,
  fps,
  handleTogglePhotoHdr,
  photoHdr,
}: Props): JSX.Element {
  return (
    <View className="absolute top-24 right-5 items-center bg-gray-200 rounded-md p-1.5 space-y-1.5">
      <Pressable onPress={handleChangePosition('front')}>
        {({pressed}): JSX.Element => (
          <View
            className={tcn(
              'items-center justify-center w-7 h-7 bg-white rounded-md',
              {
                'scale-95 bg-gray-50': pressed,
                'bg-black': position === 'front',
              },
            )}>
            {position === 'front' ? (
              <Solid.ArrowPathRoundedSquareIcon size={14} fill="white" />
            ) : (
              <Solid.ArrowPathIcon size={14} fill="black" />
            )}
          </View>
        )}
      </Pressable>
      <Pressable onPress={handleChangeFlash('on')}>
        {({pressed}): JSX.Element => (
          <View
            className={tcn(
              'items-center justify-center w-7 h-7 bg-white rounded-md',
              {
                'scale-95 bg-gray-50': pressed,
                'bg-black': flash === 'on',
              },
            )}>
            {flash === 'on' ? (
              <Solid.BoltIcon size={14} fill="white" />
            ) : (
              <Solid.BoltSlashIcon size={14} fill="black" />
            )}
          </View>
        )}
      </Pressable>
      <Pressable onPress={handleToogleSound}>
        {({pressed}): JSX.Element => (
          <View
            className={tcn(
              'items-center justify-center w-7 h-7 bg-white rounded-md',
              {
                'scale-95 bg-gray-50': pressed,
                'bg-black': sound,
              },
            )}>
            {sound ? (
              <Solid.SpeakerWaveIcon size={14} fill="white" />
            ) : (
              <Solid.SpeakerXMarkIcon size={14} fill="black" />
            )}
          </View>
        )}
      </Pressable>
      <Pressable onPress={handleTogglePhotoHdr}>
        {({pressed}): JSX.Element => (
          <View
            className={tcn(
              'items-center justify-center w-9 h-7 bg-white rounded-md',
              {
                'scale-95 bg-black/80': pressed,
                'bg-green-600': photoHdr,
              },
            )}>
            <Text
              className={tcn('text-xs text-black font-medium leading-4', {
                'text-white': photoHdr,
              })}>
              HDR
            </Text>
          </View>
        )}
      </Pressable>
      <View
        className={tcn(
          'items-center justify-center w-9 h-10 bg-white rounded-md',
          {
            'bg-blue-600': fps === 60,
          },
        )}>
        <Text
          className={tcn('text-xs text-black font-medium leading-4', {
            'text-white': fps === 60,
          })}>
          {fps}
        </Text>
        <Text
          className={tcn('text-xs text-black font-medium leading-3', {
            'text-white': fps === 60,
          })}>
          fps
        </Text>
      </View>
    </View>
  );
}

export default FloatMenu;
