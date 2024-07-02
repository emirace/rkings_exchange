import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import api from '../services/api';

export const optimizeImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission to access media library denied');
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: undefined,
    quality: 1,
  });

  if (pickerResult.canceled) {
    return;
  }

  let localUri = pickerResult.assets[0].uri;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename!);
  let type = match ? `image/${match[1]}` : `image`;

  const maxSize = 1024;
  const height = pickerResult.assets[0].height;
  const width = pickerResult.assets[0].width;

  const aspectRatio = width / height;
  let newWidth, newHeight;
  if (aspectRatio >= 1) {
    newWidth = maxSize;
    newHeight = maxSize / aspectRatio;
  } else {
    newHeight = maxSize;
    newWidth = maxSize * aspectRatio;
  }

  try {
    const resizedImage = await manipulateAsync(
      localUri,
      [{ resize: { width: newWidth, height: newHeight } }],
      { format: SaveFormat.JPEG, compress: 0.8 }
    );

    const formData = new FormData();
    //@ts-ignore
    formData.append('image', {
      uri: resizedImage.uri,
      name: filename,
      type,
    });

    const response: any = await api.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status) {
      return response.imageUrl;
    }
  } catch (err) {
    console.log('Image manipulation error: ', err);
  }
};
