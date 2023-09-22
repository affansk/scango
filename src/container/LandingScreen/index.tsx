import React, {useEffect, useState, useTransition} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useQuery} from '@tanstack/react-query';
import {getIdByQrCode} from '../../services/api';
const LandingScreen = () => {
  const [name, setName] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const {width} = Dimensions.get('screen');
  const styles = getStyles({width});

  // const getDataById = (qrId: string) => {
  const {
    data,
    isLoading,
    refetch: fetchQrCodeDetails,
  } = useQuery(['qrCodeInfo'], () => getIdByQrCode(qrCode), {
    onError: error => {
      // setChasisDetails({});
      // setAsyncStorageForChasisNumbers(undefined);
    },
    onSuccess: async result => {
      const {data, success} = result;
      
    },
    staleTime: 10000,
    retry: false,
    enabled: false,
    cacheTime: 10000,
  });

  useEffect(() => {
    fetchQrCodeDetails();
  }, [qrCode]);

  const handleQRCodeRead = (event: any) => {
    const qrId = event?.nativeEvent?.codeStringValue;
    setQrCode(qrId);
    setScanning(false);
  };

  const showQRCodeCamera = () => {
    return (
      <View style={[styles.camWrap]}>
        <View style={[styles.camWrapBtn]}>
          <Button
            disabled={name?.length > 0 || scanning ? false : true}
            title="Close"
            color="#841584"
            onPress={() => {
              setScanning(!scanning);
            }}
          />
        </View>
        <Camera
          style={{flex: 1}}
          // Barcode props
          scanBarcode={true}
          onReadCode={(event: string) => handleQRCodeRead(event)} // optional
          showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          laserColor="red" // (default red) optional, color of laser in scanner frame
          frameColor="white" // (default white) optional, color of border of scanner frame
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={[styles.loadingText]}>Loading...</Text>
      ) : scanning ? (
        showQRCodeCamera()
      ) : (
        <View style={[styles.contentWrap]}>
          <View style={{flex: 1}}>
            <Text style={styles.titleStyle}>Scan & Go</Text>
            <View style={styles.textBoxWrapper}>
              <Text>Your Name</Text>
              <TextInput
                value={name}
                style={styles.textInputStyle}
                onChangeText={e => setName(e)}
              />
            </View>
          </View>
          <View style={styles.btnMainWrap}>
            <View style={styles.buttonWrapper}>
              <Button
                disabled={name?.length > 0 || scanning ? false : true}
                title="Scan QR"
                color="#841584"
                onPress={() => {
                  setScanning(!scanning);
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const getStyles = ({width}: any) => {
  const style = StyleSheet.create({
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
    btnStyle: {
      width: '30%',
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

  return style;
};

export default LandingScreen;
