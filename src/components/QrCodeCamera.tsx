import React, {Children, useMemo} from 'react';
import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {Camera} from 'react-native-camera-kit';
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
            //disabled={name?.length > 0 || scanning ? false : true}
            title="Close"
            color="#B6E565"
            onPress={() => {
              onPress();
            }}
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
      bottom: 10,
      right: 0,
      left: 0,
      alignItems: 'center',
    },
  });
};

export default QrCodeCamera;
