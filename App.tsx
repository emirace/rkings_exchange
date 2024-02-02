import { ThemeProvider } from './src/context/ThemeContext';
import Main from './src';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar animated={true} />
        <Main />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
