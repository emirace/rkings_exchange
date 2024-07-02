import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  IconButton,
  useTheme,
  Icon,
  ActivityIndicator,
} from 'react-native-paper';
import useAuth from '../context/AuthContext';
import { baseURL } from '../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getResponsiveFontSize, getResponsiveHeight } from '../utils/size';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { UpdateFields } from '../type/user';
import { optimizeImage } from '../utils/imageOptimize';

const EditProfileForm: React.FC<{ close: () => void }> = ({ close }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState<UpdateFields>({
    address: user?.address,
    bio: user?.bio,
    dateOfBirth: user?.dateOfBirth,
    image: user?.image,
  });
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const { colors } = useTheme();

  const [date, setDate] = useState(new Date(1598051730000));
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  const handleSave = async () => {
    setLoading(true);
    const result = await updateUser(formData);
    if (result) {
      close();
    }
    setLoading(false);
  };

  const onChange = (_event: any, currentDate: any) => {
    setDate(currentDate);
    setFormData({ ...formData, dateOfBirth: currentDate });
  };

  const handleImageSelection = async () => {
    setLoadingImage(true);
    const result = await optimizeImage();
    if (result) {
      setFormData({ ...formData, image: result });
    }
    setLoadingImage(false);
  };

  return (
    <Card style={styles.container} mode="contained">
      <Card.Cover source={{ uri: baseURL + formData.image }} />

      {loadingImage ? (
        <ActivityIndicator style={styles.editImageIcon} />
      ) : (
        <IconButton
          icon={() => <Icon source="image" size={20} color={colors.primary} />}
          style={styles.editImageIcon}
          onPress={handleImageSelection}
        />
      )}

      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 20,
          }}
        >
          <Text
            style={{ fontSize: getResponsiveFontSize(20), fontWeight: '600' }}
          >
            Date of birth:
          </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        </View>
        <TextInput
          label="Username"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <TextInput
          label="Bio"
          value={formData.bio}
          onChangeText={(text) => setFormData({ ...formData, bio: text })}
          multiline
          numberOfLines={3}
          style={[styles.input, { height: getResponsiveHeight(150) }]}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          left={<TextInput.Icon icon="text" />}
        />
      </Card.Content>

      <Button
        mode="contained"
        contentStyle={{ height: getResponsiveHeight(50) }}
        onPress={handleSave}
        style={styles.saveButton}
        uppercase
        disabled={loading}
        loading={loading}
      >
        Save
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: 'transparent',
  },
  editImageIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  input: {
    marginVertical: getResponsiveHeight(20),
  },
  saveButton: {
    marginVertical: getResponsiveHeight(20),
    borderRadius: 5,
  },
});

export default EditProfileForm;
