import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Routes from './routes';
import LandingScreen from '../../container/LandingScreen';

const Stack = createNativeStackNavigator();

const scanRoutes = {
  [Routes.ROUTE_APP_LANDING_SCREEN]: LandingScreen,
};

function ScanStack() {
  //const disableGesture = ['GettingStartedScreen'];
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.ROUTE_APP_LANDING_SCREEN}>
      {Object.keys(scanRoutes).map(routeName => {
        return (
          <Stack.Screen
            options={{
              gestureEnabled: true,
            }}
            key={routeName}
            name={routeName}
            component={scanRoutes[routeName]}
          />
        );
      })}
    </Stack.Navigator>
  );
}
export default ScanStack;
