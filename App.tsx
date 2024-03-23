import React, {useState, useCallback, useRef} from 'react';
import {View, Pressable, SafeAreaView, Dimensions} from 'react-native';
import {
  Camera,
  CameraCaptureError,
  CameraDevice,
  CameraRuntimeError,
  useCameraFormat,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import RequestPermission from '@/components/request-permission';
import FindAnyCamera from '@/components/find-any-camera';
import ErrorMessage from '@/components/error-message';
import PhotoSmall from '@/components/photo-small';
import CountSmall from '@/components/count-small';
import SlidePhotos from '@/components/slide-photos';
import FloatMenu from '@/components/float-menu';
import {tcn} from '@/utils/tailwind';

function App(): JSX.Element {
  const refCamera = useRef<Camera>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const [position, setPosition] = useState<'front' | 'back'>('back');
  const [sound, setSound] = useState<boolean>(false);
  const [photoHdr, setPhotoHdr] = useState<boolean>(false);
  const [showPhotos, setShowPhotos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const {hasPermission, requestPermission} = useCameraPermission();
  const device: CameraDevice | undefined = useCameraDevice(position, {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const screen = Dimensions.get('screen');
  const format = useCameraFormat(device, [
    {videoAspectRatio: screen.height / screen.width},
    {fps: 60},
    {
      photoHdr,
    },
  ]);

  const handleChangePosition = (value: 'front' | 'back') => (): void => {
    if (value === position) {
      setPosition('back');
    } else {
      setPosition(value);
    }
  };

  const handleChangeFlash = (value: 'on' | 'off') => (): void => {
    if (value === flash) {
      setFlash('off');
    } else {
      setFlash(value);
    }
  };

  const handleToogleSound = (): void => setSound(!sound);

  const handleTogglePhotoHdr = (): void => setPhotoHdr(!photoHdr);

  const handleToggleShowPhotos = (): void => setShowPhotos(!showPhotos);

  const handleRemovePhoto = (current: number): void => {
    photos.splice(current, 1);
    setPhotos([...photos]);
  };

  const handleError = useCallback((error: CameraRuntimeError): void => {
    setErrorMessage(error.message);
  }, []);

  const handleTakePhoto = useCallback(async (): Promise<void> => {
    try {
      const photo: PhotoFile | undefined = await refCamera.current?.takePhoto({
        qualityPrioritization: 'speed',
        flash,
        enableShutterSound: sound,
      });
      if (photo) {
        const value: string[] = [...photos, photo.path];
        setPhotos(value);
      }
    } catch (error) {
      if (error instanceof CameraCaptureError) {
        switch (error.code) {
          case 'capture/file-io-error':
            setErrorMessage('Failed to write photo to disk!');
            break;
          default:
            setErrorMessage(error.message);
            break;
        }
      }
    }
  }, [refCamera, flash, sound, photos]);

  return (
    <SafeAreaView className="relative flex-1 items-center justify-center bg-black">
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {!hasPermission && (
        <RequestPermission requestPermission={requestPermission} />
      )}
      {!device && <FindAnyCamera />}
      {hasPermission && device && (
        <Camera
          ref={refCamera}
          className="w-full h-full bg-black"
          device={device}
          isActive
          photo
          format={format}
          fps={format?.maxFps}
          photoHdr={format?.supportsPhotoHdr}
          onError={handleError}
        />
      )}
      {hasPermission && device && (
        <FloatMenu
          handleChangePosition={handleChangePosition}
          position={position}
          handleChangeFlash={handleChangeFlash}
          flash={flash}
          handleToogleSound={handleToogleSound}
          sound={sound}
          fps={format?.maxFps}
          handleTogglePhotoHdr={handleTogglePhotoHdr}
          photoHdr={photoHdr}
        />
      )}
      {hasPermission && device && (
        <Pressable
          onPress={handleToggleShowPhotos}
          className="absolute bottom-12 left-5">
          {({pressed}): JSX.Element => (
            <View
              className={tcn('relative', {
                'opacity-80': pressed,
              })}>
              {photos
                .slice(0, 3)
                .map((photo: string, index: number): JSX.Element => {
                  return <PhotoSmall key={index} index={index} photo={photo} />;
                })}
              {photos.length > 0 && <CountSmall count={photos.length} />}
            </View>
          )}
        </Pressable>
      )}
      {hasPermission && device && (
        <Pressable onPress={handleTakePhoto} className="absolute bottom-12">
          {({pressed}): JSX.Element => (
            <View
              className={tcn(
                'items-center justify-center w-20 h-20 rounded-full bg-gray-300',
                {
                  'bg-gray-200 scale-110': pressed,
                },
              )}>
              <View
                className={tcn('w-16 h-16 rounded-full bg-white', {
                  'scale-95 bg-black': pressed,
                })}
              />
            </View>
          )}
        </Pressable>
      )}
      {showPhotos && (
        <SlidePhotos photos={photos} handleRemovePhoto={handleRemovePhoto} />
      )}
    </SafeAreaView>
  );
}

export default App;
