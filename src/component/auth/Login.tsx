import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import useAuth from '../../context/AuthContext';
import { AuthNavigationProp } from '../../type/navigation/stackNav';

const Login: React.FC<
  AuthNavigationProp & { gotoForgetPassword: () => void }
> = ({ navigation, gotoForgetPassword }) => {
  const { login, loading, error: loginError } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const handleLogin = async () => {
    // Basic email and password validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
    } else {
      const result = await login({ email, password });
      if (result) {
        navigation.navigate('HomeMain');
      } else {
        setError(loginError || '');
      }
    }
  };

  const handleForgotPassword = () => {
    gotoForgetPassword();
  };

  const isValidEmail = (email: string): boolean => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <Text style={styles.description}>
        Enter your email and password to continue.
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError('');
        }}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={handleTogglePasswordVisibility}
          />
        }
        style={styles.input}
        secureTextEntry={!showPassword}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.loginButton}
        labelStyle={{ fontSize: getResponsiveFontSize(22) }}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.socialIconsContainer}>
        <IconButton
          icon="facebook"
          size={28}
          iconColor={colors.primary}
          style={styles.socialIcon}
        />
        <IconButton
          icon="google-plus"
          size={28}
          iconColor={colors.primary}
          style={styles.socialIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsiveHeight(20),
  },
  header: {
    fontSize: getResponsiveFontSize(28),
    fontWeight: 'bold',
    marginBottom: getResponsiveHeight(10),
  },
  description: {
    fontSize: getResponsiveFontSize(16),
    opacity: 0.5,
    marginBottom: getResponsiveHeight(30),
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
    height: getResponsiveHeight(50),
    justifyContent: 'center',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
  },
  forgotPasswordText: {
    marginTop: 16,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default Login;
