import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getIdByQrCode} from '../../services/api';
import {useFirebaseAPI, useGeneralFunction} from '../../hooks';
import {OrderModel} from '../../services/models/appModels';
import MyOrders from '../../components/myOrders';
import QrCodeCamera from '../../components/QrCodeCamera';
import {useAppContext} from '../../services/context/AppContext';
import DeviceInfo from 'react-native-device-info';
const {width} = Dimensions.get('screen');
const LandingScreen = () => {
  const [name, setName] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);

  const styles = getStyles({width});
  const {getAllOrders, myOrders} = useFirebaseAPI();
  const {openSms} = useGeneralFunction();
  const {state, dispatch} = useAppContext();

  // Function to set the UUID in global state
  const setUUID = async () => {
    const newUUID = await DeviceInfo.getUniqueId();
    dispatch({type: 'SET_UUID', payload: newUUID});
  };

  useEffect(() => {
    setUUID();
  }, []);

  useEffect(() => {
    if (state?.uuid !== null) {
      console.log('state?.uuid', state?.uuid);
      getAllOrders();
    }
  }, [state?.uuid]);

  const fetchUsers = async () => {
    return await getIdByQrCode(state?.qrCode);
  };
  const {
    data,
    status,
    isLoading: fetchQrCodeLoading,
    refetch: fetchQrCodeDetails,
  } = useQuery(['users'], fetchUsers, {
    enabled: false,
    onError: error => {
      console.log('error', error);
    },
    onSuccess: async res => {
      const {message, phoneNumber, dish} = res?.data;
      const data: OrderModel = {
        uuid: state?.uuid,
        phoneNumber: phoneNumber,
        dish: dish,
      };
      openSms(data, message, name);
    },
  });

  // const {isLoading: fetchQrCodeLoading, refetch: fetchQrCodeDetails} = useQuery(
  //   [qrCode, 'qrCode'],
  //   () => getIdByQrCode(qrCode),
  //   {
  //     retry: false,
  //     enabled: false,
  //     onError: error => {
  //       console.log('error', error);
  //     },
  //     onSuccess: async res => {
  //       const {message, phoneNumber, dish} = res?.data;
  //       const data: OrderModel = {
  //         uuid: state?.uuid,
  //         phoneNumber: phoneNumber,
  //         dish: dish,
  //       };
  //       openSms(data, message, name);
  //     },
  //   },
  // );

  useEffect(() => {
    console.log('qrCode.length', state?.qrCode);
    if (state?.qrCode !== undefined) {
      fetchQrCodeDetails();
    }
  }, [state?.qrCode]);
  const handleQRCodeRead = (event: any) => {
    const qrId = event?.nativeEvent?.codeStringValue;
    // setQrCode(qrId);
    dispatch({type: 'SET_QRCODE', payload: qrId});
    setScanning(false);
  };

  return (
    <View style={styles.container}>
      {
        // fetchQrCodeLoading ? (
        //   <Text style={[styles.loadingText]}>Loading...</Text>
        // ) :
        scanning ? (
          <QrCodeCamera
            onPress={() => setScanning(!scanning)}
            scanning={scanning}
            name={name}
            onReadCode={(event: string) => handleQRCodeRead(event)}
          />
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
              {myOrders.length > 0 && <MyOrders data={myOrders} />}
            </View>
            <View style={styles.btnMainWrap}>
              <View style={styles.buttonWrapper}>
                <Button
                  disabled={name?.length > 0 || scanning ? false : true}
                  title="Scan QR"
                  color="#841584"
                  onPress={() => {
                    setScanning(!scanning);
                    // refetchhello();
                  }}
                />
              </View>
            </View>
          </View>
        )
      }
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
