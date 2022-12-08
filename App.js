import 'react-native-gesture-handler';
import { Navigation } from './src/navigation/navigator';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Logo-Font': require('./assets/fonts/Angkor-Regular.ttf')
  });

  return (
    fontsLoaded &&
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}


export default App;