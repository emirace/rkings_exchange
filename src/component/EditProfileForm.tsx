// EditProfileForm.tsx

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Avatar,
  Card,
  IconButton,
  useTheme,
  Icon,
} from 'react-native-paper';
import useAuth from '../context/AuthContext';
import { baseURL } from '../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getResponsiveFontSize, getResponsiveHeight } from '../utils/size';
import * as ImagePicker from 'expo-image-picker';

const EditProfileForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<any>(user);
  const { colors } = useTheme();

  const [date, setDate] = useState(new Date(1598051730000));

  const handleSave = () => {
    // onSave(formData);
  };

  const onChange = (_event: any, currentDate: any) => {
    setDate(currentDate);
    setFormData({ ...formData, dateOfBirth: currentDate });
  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Update the profile image URI in the form data
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  return (
    <Card style={styles.container} mode="contained">
      <Card.Cover source={{ uri: formData.image }} />

      <IconButton
        icon={() => <Icon source="image" size={20} color={colors.primary} />}
        style={styles.editImageIcon}
        onPress={handleImageSelection}
      />

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
        />
        <TextInput
          label="Bio"
          value={formData.bio}
          onChangeText={(text) => setFormData({ ...formData, bio: text })}
          multiline
          numberOfLines={3}
          style={styles.input}
          left={<TextInput.Icon icon="text" />}
        />
      </Card.Content>

      <Button
        mode="contained"
        contentStyle={{ height: getResponsiveHeight(50) }}
        onPress={handleSave}
        style={styles.saveButton}
        uppercase
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
