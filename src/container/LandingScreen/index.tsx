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
  const {getAllOrders, myOrders, addOrder} = useFirebaseAPI();
  const {openSms} = useGeneralFunction();
  const {state, dispatch} = useAppContext();
  const {uuid, qrCode} = state;
  useEffect(() => {
    if (uuid !== null) {
      console.log('state?.uuid', uuid);
      getAllOrders();
    }
  }, [uuid]);

  const fetchQr = async () => {
    return await getIdByQrCode(qrCode);
  };
  const {
    fetchStatus: fetchQrCodeStatus,
    isFetching: fetchQrCodeLoading,
    refetch: fetchQrCodeDetails,
  } = useQuery(['users'], fetchQr, {
    enabled: false,
    retry: false,
    onError: error => {
      console.log('error', error);
    },
    onSuccess: async res => {
      console.log('state?.uuid123,', uuid);
      const {message, phoneNumber, dish} = res?.data;
      const data: OrderModel = {
        uuid: uuid,
        phoneNumber: phoneNumber,
        dish: dish,
      };
      if (message !== 'error') {
        addOrder(data);
        openSms(data, message, name);
      }
    },
  });

  useEffect(() => {
    if (qrCode !== undefined) {
      fetchQrCodeDetails();
    }
  }, [qrCode]);

  const handleQRCodeRead = (event: any) => {
    const qrId = event?.nativeEvent?.codeStringValue;
    // setQrCode(qrId);
    dispatch({type: 'SET_QRCODE', payload: qrId});
    setScanning(false);
  };
  const isLoadingV3 = fetchQrCodeLoading && fetchQrCodeStatus !== 'idle';
  return (
    <View style={styles.container}>
      {isLoadingV3 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={[styles.loadingText]}>Loading...</Text>
        </View>
      ) : scanning ? (
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
                color="#B6E565"
                onPress={() => {
                  dispatch({type: 'SET_QRCODE', payload: undefined});
                  setScanning(!scanning);
                  // refetchhello();
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
    btnMainWrap: {
      alignItems: 'center',
    },
    contentWrap: {
      paddingHorizontal: 20,
      flex: 1,
    },
    loadingText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return style;
};

export default LandingScreen;
