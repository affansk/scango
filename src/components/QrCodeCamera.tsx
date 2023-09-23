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
  scanning = false,
  name,
  onPress = () => {},
  onReadCode = () => {},
}: Props) => {
  const {width} = Dimensions.get('screen');
  const styles = useMemo(() => getStyles({width}), [width]);
  const showQRCodeCamera = () => {
    return (
      <View style={[styles.camWrap]}>
        <View style={[styles.camWrapBtn]}>
          <Button
            disabled={name?.length > 0 || scanning ? false : true}
            title="Close"
            color="#841584"
            onPress={() => {
              onPress();
            }}
          />
        </View>
        <Camera
          style={{flex: 1}}
          scanBarcode={true}
          onReadCode={(event: string) => onReadCode(event)}
          showFrame={true}
          laserColor="red"
          frameColor="white"
        />
      </View>
    );
  };
  return <View style={[styles.camWrap]}>{showQRCodeCamera()}</View>;
};

const getStyles = ({width}: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#64E1FF',
    },
    textBoxWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    textInputStyle: {
      borderWidth: 1,
      borderColor: '#000',
      height: 30,
      flex: 1,
      marginLeft: 10,
      backgroundColor: '#fff',
      padding: 0,
      paddingLeft: 10,
    },
    buttonWrapper: {
      marginVertical: 30,
      width: '40%',
    },
    btnMainWrap: {
      alignItems: 'center',
    },
    contentWrap: {
      paddingHorizontal: 20,
      flex: 1,
    },
    camWrap: {
      position: 'relative',
      flex: 1,
    },
    camWrapBtn: {
      position: 'absolute',
      zIndex: 9999,
      bottom: 10,
      right: width / 2,
    },
    loadingText: {
      textAlign: 'center',
    },
  });
};

export default QrCodeCamera;
