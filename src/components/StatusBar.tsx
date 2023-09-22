import React, {Children} from 'react';
import {StyleProp, View, ViewStyle, StatusBar} from 'react-native';
import {NativeModules} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
//const {StatusBarManager} = NativeModules;
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface StatusBarProps {}
const StatBar: React.FC<StatusBarProps> = (props: any) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <View
      style={{
        height: statusBarHeight || StatusBar?.currentHeight,
        width: '100%',
      }}>
      <View style={{height: statusBarHeight || StatusBar?.currentHeight}}>
        {/* <LinearGradient
          colors={['#eefbff', '#eefbff', '#eefbff']}
          style={{flex: 1}}> */}
        <StatusBar translucent {...props} />
        {/* </LinearGradient> */}
      </View>
    </View>
  );
};

export default StatBar;
