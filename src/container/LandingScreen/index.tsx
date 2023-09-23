import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getIdByQrCode} from '@app/services/api';
import {useFirebaseAPI, useGeneralFunction} from '@app/hooks';
import {OrderModel} from '@app/services/models/appModels';
import {MyOrders, QrCodeCamera, SMS} from '@app/components';
import {useAppContext} from '@app/services/context/AppContext';

// Get the screen width
const {width} = Dimensions.get('screen');

// Define the LandingScreen component
const LandingScreen = () => {
  // State variables
  const [name, setName] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);

  // Styles based on screen width
  const styles = getStyles({width});

  // Custom hooks for Firebase API and general functions
  const {getAllOrders, myOrders, addOrder} = useFirebaseAPI();
  const {openSms} = useGeneralFunction();

  // Context for the app
  const {state, dispatch} = useAppContext();
  const {uuid, qrCode} = state;

  // Effect to load orders when uuid changes
  useEffect(() => {
    if (uuid !== null) {
      getAllOrders();
    }
  }, [uuid]);

  // Function to fetch data based on QR code
  const fetchQr = async () => {
    return await getIdByQrCode(qrCode);
  };

  // UseQuery hook to fetch QR code details
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
      const {message, phoneNumber, dish} = res?.data;
      const isSmsAvailable = await SMS.isAvailableAsync();
      const data: OrderModel = {
        uuid: uuid,
        phoneNumber: phoneNumber,
        dish: dish,
      };
      if (message !== 'error' && isSmsAvailable) {
        addOrder(data);
        openSms(data, message, name);
      } else if (!isSmsAvailable) {
        Alert.alert('Sending Sms not Supported');
      }
    },
  });

  // Effect to fetch QR code details when qrCode changes
  useEffect(() => {
    if (qrCode !== undefined) {
      fetchQrCodeDetails();
    }
  }, [qrCode]);

  // Function to handle QR code reading
  const handleQRCodeRead = (event: any) => {
    const qrId = event?.nativeEvent?.codeStringValue;
    dispatch({type: 'SET_QRCODE', payload: qrId});
    setScanning(false);
  };

  // Memoized MyOrders component to improve performance
  const memoizedMyOrders = useMemo(() => {
    if (myOrders.length > 0) {
      return <MyOrders data={myOrders} />;
    }
    return null; // Return null if myOrders is empty
  }, [myOrders]);

  // Memoized QrCodeCamera component to improve performance
  const memoizedQrCodeComp = useMemo(() => {
    return (
      <QrCodeCamera
        onPress={() => setScanning(!scanning)}
        onReadCode={(event: string) => handleQRCodeRead(event)}
      />
    );
  }, [scanning]);

  // Determine if QR code is loading
  const isLoadingQRCode = fetchQrCodeLoading && fetchQrCodeStatus !== 'idle';

  // Render the component
  return (
    <View style={styles.container}>
      {isLoadingQRCode ? (
        <View style={[styles.loadingQrScreen]}>
          <Text style={[styles.loadingText]}>Loading...</Text>
        </View>
      ) : scanning ? (
        memoizedQrCodeComp
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
            {memoizedMyOrders}
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

// Styles for the component
const getStyles = ({width}: any) => {
  const style = StyleSheet.create({
    loadingQrScreen: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
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
