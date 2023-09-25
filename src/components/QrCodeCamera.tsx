import React, {Children, useMemo} from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {Button} from '@app/components';
interface QrCodeCameraProps {
  data?: Object;
  name?: string;
  scanning?: boolean;
  onPress?: () => void;
  onReadCode?: () => void;
}

const QrCodeCamera: React.FC<QrCodeCameraProps> = ({
  onPress = () => {},
  onReadCode = () => {},
}: Props) => {
  const {width} = Dimensions.get('screen');
  const styles = useMemo(() => getStyles({width}), [width]);
  const showQRCodeCamera = () => {
    return (
      <View style={[styles.camWrap]}>
        <Camera
          style={{flex: 1}}
          scanBarcode={true}
          onReadCode={(event: string) => onReadCode(event)}
          showFrame={true}
          laserColor="red"
          frameColor="white"
        />
        <View style={[styles.camWrapBtn]}>
          <Button
            title={'Close'}
            disabled={false}
            onPress={onPress}
            onReadCode={onReadCode}
          />
        </View>
      </View>
    );
  };
  return <View style={[styles.camWrap]}>{showQRCodeCamera()}</View>;
};

const getStyles = ({}: any) => {
  return StyleSheet.create({
    camWrap: {
      position: 'relative',
      flex: 1,
    },
    camWrapBtn: {
      position: 'absolute',
      zIndex: 9999,
      bottom: Platform.OS === 'ios' ? 20 : 10,
      right: 0,
      left: 0,
      alignItems: 'center',
    },
  });
};

export default QrCodeCamera;
