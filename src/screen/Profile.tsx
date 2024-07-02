import { View, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  Appbar,
  Button,
  Chip,
  Dialog,
  Divider,
  FAB,
  Icon,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import { ProfileNavigationProp } from '../type/navigation/stackNav';
import { baseURL } from '../services/api';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import useAuth from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../component/CustomBackdrop';
import EditProfileForm from '../component/EditProfileForm';

const Profile: React.FC<ProfileNavigationProp> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const close = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
  };

  const handleLogout = async () => {
    await logout();
    onDismiss();
    navigation.navigate('HomeMain');
  };

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header
        style={{
          zIndex: 10,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
        }}
      >
        <Appbar.BackAction onPress={navigation.goBack} />
        {/* <Appbar.Content title="Exchange" /> */}
      </Appbar.Header>
      <View style={styles.imageCont}>
        <Image source={{ uri: baseURL + user?.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.gradient}
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        <View
          style={[styles.contentbody, { backgroundColor: colors.background }]}
        >
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName} - {user?.username}
          </Text>

          <FAB
            icon="pencil"
            color="white"
            style={{
              backgroundColor: colors.primary,
              borderRadius: 100,
              position: 'absolute',
              top: -getResponsiveHeight(50),
              right: getResponsiveWidth(20),
            }}
            onPress={openBottomSheet}
            mode="elevated"
            customSize={getResponsiveHeight(70)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: getResponsiveHeight(20),
            }}
          >
            <Chip
              mode="outlined"
              icon="lightning-bolt-outline"
              // style={styles.chip}
              selectedColor={colors.primary}
              //   onPress={() => navigation.navigate('Search', { query: '' })}
            >
              {user?.isActive ? 'Active' : 'Inactive'}
            </Chip>
            <Chip
              mode="outlined"
              icon="account-plus-outline"
              // style={styles.chip}
              selectedColor={colors.primary}
              //   onPress={() => navigation.navigate('Search', { query: '' })}
            >
              Join {moment(user?.createdAt).fromNow()}
            </Chip>
          </View>
          <Text style={styles.title}>Personal Info</Text>
          <View
            style={[
              styles.infoCont,
              { backgroundColor: colors.elevation.level4 },
            ]}
          >
            <View style={styles.rowCont}>
              <View style={styles.labelcont}>
                <Icon size={20} source="email" />
                <Text style={styles.label}>Email</Text>
              </View>
              <Text style={styles.value}>{user?.email || 'nil'}</Text>
            </View>
            <Divider
              style={{ backgroundColor: colors.background, height: 2 }}
            />
            <View style={styles.rowCont}>
              <View style={styles.labelcont}>
                <Icon size={20} source="phone" />
                <Text style={styles.label}>Phone</Text>
              </View>
              <Text style={styles.value}>{user?.phone || 'nil'}</Text>
            </View>

            <Divider
              style={{ backgroundColor: colors.background, height: 2 }}
            />
            <View style={styles.rowCont}>
              <View style={styles.labelcont}>
                <Icon size={20} source="email" />
                <Text style={styles.label}>Date of Birth</Text>
              </View>
              <Text style={styles.value}>
                {moment(user?.dateOfBirth).format('ddd DD  MMMM YYYY') || 'nil'}
              </Text>
            </View>

            <Divider
              style={{ backgroundColor: colors.background, height: 2 }}
            />
            <View style={styles.rowCont}>
              <View style={styles.labelcont}>
                <Icon size={20} source="text-account" />
                <Text style={styles.label}>About Me</Text>
              </View>
              <Text style={styles.value}>{user?.bio || 'nil'}</Text>
            </View>
          </View>
          <View style={{ marginTop: getResponsiveHeight(20) }}>
            <Text style={styles.title}>Utilities</Text>
            {user && (
              <List.Item
                title="Log out"
                titleStyle={{
                  fontSize: getResponsiveFontSize(22),
                }}
                left={() => <List.Icon icon="logout" />}
                onPress={() => setVisible(true)}
                style={{
                  backgroundColor: colors.elevation.level5,
                  borderRadius: 10,
                  paddingHorizontal: getResponsiveWidth(20),
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Logout</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to logout?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleLogout}>Logout</Button>
        </Dialog.Actions>
      </Dialog>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['90%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <EditProfileForm close={close} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imageCont: {
    height: getResponsiveHeight(400),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  image: {
    height: getResponsiveHeight(400),
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
  },
  contentbody: {
    marginTop: getResponsiveHeight(280),
    padding: getResponsiveHeight(20),
  },
  name: {
    fontSize: getResponsiveFontSize(32),
    fontWeight: '600',
    position: 'absolute',
    top: -getResponsiveHeight(50),
    left: getResponsiveWidth(20),
    color: 'white',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  title: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: '600',
    marginBottom: getResponsiveHeight(5),
  },
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: getResponsiveHeight(20),
  },
  value: { opacity: 0.5, fontSize: getResponsiveFontSize(20) },
  labelcont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: '600',
  },
  infoCont: { borderRadius: 15 },
});

export default Profile;
