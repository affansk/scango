import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './routes';
import scanStack from '@app/navigation/scanStack';

const Stack = createNativeStackNavigator();

const appRoutes = {
  [Routes.NAVIGATOR_WRAPPER_STACK]: scanStack,
};

function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.NAVIGATOR_WRAPPER_STACK}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      {Object.keys(appRoutes).map(routeName => (
        <Stack.Screen
          key={routeName}
          name={routeName}
          component={appRoutes[routeName]}
        />
      ))}
    </Stack.Navigator>
  );
}
export default AppNavigation;
