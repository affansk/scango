import React, {Children} from 'react';
import {StyleProp, ViewStyle, View, Button, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface ButtonProps {
  title: string;
  disabled: boolean;
  onPress?: () => void;
}
const AppButton: React.FC<ButtonProps> = (props: any) => {
  const {onPress, title, disabled = false, ...rest} = props;
  //   const insets = useSafeAreaInsets();
  return (
    <View>
      <View
        style={{
          backgroundColor: '#B6E565',
          borderWidth: 1,
          borderRadius: 3,
        }}>
        <Button
          disabled={disabled}
          title={title}
          color={Platform.OS === 'android' ? '#B6E565' : '#000'}
          onPress={() => {
            onPress();
          }}
          {...rest}
        />
      </View>
    </View>
  );
};

export default AppButton;
