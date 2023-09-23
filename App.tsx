import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './src/navigation';

// import {KeyboardProvider} from 'react-native-keyboard-controller';
// after other import statements
import '@app/constants/IMLocalize';

import {StatBar} from './src/components';
import {ToastProvider} from 'react-native-toast-notifications';
import Toast from 'react-native-toast-notifications';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppContextProvider} from './src/services/context/AppContext';
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ToastProvider>
          <GestureHandlerRootView
            style={{
              flex: 1,
            }}>
            <NavigationContainer>
              <StatBar />
              <AppContextProvider>
                <AppNavigation />
              </AppContextProvider>
            </NavigationContainer>
            {/* </KeyboardProvider> */}
          </GestureHandlerRootView>
        </ToastProvider>
        <Toast ref={ref => (global['toast'] = ref)} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
