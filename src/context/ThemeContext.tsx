import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  themeMode: 'dark' | 'light';
  selectedThemeMode: 'system' | 'dark' | 'light';
  toggleTheme: (value: 'system' | 'dark' | 'light') => void;
  scrollY: number;
  setScrollY: (value: number) => void;
};

interface Props {
  children?: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [scrollY, setScrollY] = useState<number>(0);
  const colorScheme = useColorScheme();

  const loadThemeMode = async () => {
    try {
      const storedThemeMode = await SecureStore.getItemAsync(
        'selectedThemeMode'
      );
      const initialThemeMode = storedThemeMode
        ? (storedThemeMode as 'system' | 'dark' | 'light')
        : 'system';
      setSelectedThemeMode(initialThemeMode);
    } catch (error) {
      console.error('Error loading theme mode:', error);
    }
  };

  const saveThemeMode = async () => {
    try {
      await SecureStore.setItemAsync('selectedThemeMode', selectedThemeMode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const [selectedThemeMode, setSelectedThemeMode] = useState<
    'system' | 'dark' | 'light'
  >('system');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');

  const toggleTheme = (value: 'system' | 'dark' | 'light') => {
    setSelectedThemeMode(value);
  };

  // Load initial theme mode on component mount
  useEffect(() => {
    loadThemeMode();
  }, []);

  // Save theme mode whenever it changes
  useEffect(() => {
    saveThemeMode();
  }, [selectedThemeMode]);

  // Listen for system appearance changes
  useEffect(() => {
    if (selectedThemeMode === 'system') {
      setThemeMode(colorScheme as 'dark' | 'light');
    } else {
      setThemeMode(selectedThemeMode);
    }
  }, [selectedThemeMode]);

  return (
    <ThemeContext.Provider
      value={{ themeMode, toggleTheme, scrollY, setScrollY, selectedThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default useTheme;
