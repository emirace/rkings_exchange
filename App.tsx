import 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import Main from './src';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
