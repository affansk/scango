// import React, {useEffect, useState, useMemo, useCallback} from 'react';
// import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler';
// import {Camera} from 'react-native-camera-kit';
// import {useQuery} from '@tanstack/react-query';
// import {getIdByQrCode} from '../../services/api';
// import * as SMS from 'expo-sms';
// import {useFirebaseAPI} from '../../hooks';
// import {OrderModel} from '../../services/models/appModels';
// import {useAppContext} from '../../services/context/AppContext';
// import uuid from 'react-native-uuid';
// import MyOrders from '../../components/myOrders';
// import QrCodeCamera from '../../components/QrCodeCamera';

// const LandingScreen = () => {
//   const [name, setName] = useState<string>('');
//   const [qrCode, setQrCode] = useState<string>('-1');
//   const [scanning, setScanning] = useState<boolean>(false);
//   const {width} = Dimensions.get('screen');
//   const styles = useMemo(() => getStyles({width}), [width]);
//   const {addOrder, getAllOrders, myOrders} = useFirebaseAPI();
//   const {state, dispatch} = useAppContext();

//   // Function to set the UUID in global state
//   const setUUID = async () => {
//     const newUUID = uuid.v4(); //();
//     console.log('newUUID', newUUID);
//     dispatch({type: 'SET_UUID', payload: newUUID});
//   };

//   useEffect(() => {
//     if (!state?.uuid) {
//       // If UUID is not set, generate and set it when the component mounts
//       setUUID();
//     }
//   }, [state?.uuid]);

//   useEffect(() => {
//     getAllOrders();
//   }, []);

//   const smsAvailable = useCallback(async () => {
//     return await SMS.isAvailableAsync();
//   }, []);

//   const openSms = useCallback(
//     async (data: OrderModel, message: string = null) => {
//       const isSmsAvailable = await smsAvailable();
//       if (message !== 'error' && isSmsAvailable) {
//         const {result} = await SMS.sendSMSAsync(
//           '+971562546537',
//           message.replace('{{Full Name}}', name),
//         );
//         console.log('resull', result);
//         addOrder(data);
//       }
//     },
//     [addOrder, smsAvailable, name],
//   );

//   const {isLoading: fetchQrCodeLoading, refetch: fetchQrCodeDetails} = useQuery(
//     ['qrCodeInfo'],
//     () => getIdByQrCode(qrCode),
//     {
//       retry: false,
//       enabled: false,
//       onError: error => {
//         console.log('error', error);
//       },
//       onSuccess: async res => {
//         const {message, phoneNumber, dish} = res?.data;
//         const data: OrderModel = {
//           uuid: 'sd',
//           phoneNumber: phoneNumber,
//           dish: dish,
//         };
//         openSms(data, message);
//       },
//     },
//   );

//   useEffect(() => {
//     if (qrCode.length > 0) {
//       fetchQrCodeDetails();
//     }
//   }, [qrCode, fetchQrCodeDetails]);

//   const handleQRCodeRead = useCallback((event: any) => {
//     const qrId = event?.nativeEvent?.codeStringValue;
//     setQrCode(qrId);
//     setScanning(false);
//   }, []);

//   // const showQRCodeCamera = useMemo(() => {
//   //   return (
//   //     <View style={[styles.camWrap]}>
//   //       <View style={[styles.camWrapBtn]}>
//   //         <Button
//   //           disabled={name?.length > 0 || scanning ? false : true}
//   //           title="Close"
//   //           color="#841584"
//   //           onPress={() => {
//   //             setScanning(!scanning);
//   //           }}
//   //         />
//   //       </View>
//   //       <Camera
//   //         style={{flex: 1}}
//   //         scanBarcode={true}
//   //         onReadCode={(event: string) => handleQRCodeRead(event)}
//   //         showFrame={true}
//   //         laserColor="red"
//   //         frameColor="white"
//   //       />
//   //     </View>
//   //   );
//   // }, [styles.camWrap, styles.camWrapBtn, name, scanning, handleQRCodeRead]);

//   return (
//     <View style={styles.container}>
//       {fetchQrCodeLoading ? (
//         <Text style={[styles.loadingText]}>Loading...</Text>
//       ) : scanning ? (
//         <QrCodeCamera onPress={()=>setScanning(!scanning)} scanning={scanning} name={name} onReadCode={(event:string)=>handleQRCodeRead(event)}/>
//       ) : (
//         <View style={[styles.contentWrap]}>
//           <View style={{flex: 1}}>
//             <Text style={styles.titleStyle}>Scan & Go</Text>
//             <View style={styles.textBoxWrapper}>
//               <Text>Your Name</Text>
//               <TextInput
//                 value={name}
//                 style={styles.textInputStyle}
//                 onChangeText={e => setName(e)}
//               />
//             </View>
//             {myOrders.length > 0 && <MyOrders data={myOrders} />}
//           </View>
//           <View style={styles.btnMainWrap}>
//             <View style={styles.buttonWrapper}>
//               <Button
//                 disabled={name?.length > 0 || scanning ? false : true}
//                 title="Scan QR"
//                 color="#841584"
//                 onPress={() => {
//                   setScanning(!scanning);
//                 }}
//               />
//             </View>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const getStyles = ({width}: any) => {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#64E1FF',
//     },
//     textBoxWrapper: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginTop: 10,
//     },
//     titleStyle: {
//       textAlign: 'center',
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     textInputStyle: {
//       borderWidth: 1,
//       borderColor: '#000',
//       height: 30,
//       flex: 1,
//       marginLeft: 10,
//       backgroundColor: '#fff',
//       padding: 0,
//       paddingLeft: 10,
//     },
//     buttonWrapper: {
//       marginVertical: 30,
//       width: '40%',
//     },
//     btnMainWrap: {
//       alignItems: 'center',
//     },
//     contentWrap: {
//       paddingHorizontal: 20,
//       flex: 1,
//     },
//     camWrap: {
//       position: 'relative',
//       flex: 1,
//     },
//     camWrapBtn: {
//       position: 'absolute',
//       zIndex: 9999,
//       bottom: 10,
//       right: width / 2,
//     },
//     loadingText: {
//       textAlign: 'center',
//     },
//   });
// };

// export default LandingScreen;

import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Button, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Camera} from 'react-native-camera-kit';
import {useQuery} from '@tanstack/react-query';
import {getIdByQrCode} from '../../services/api';
import * as SMS from 'expo-sms';
import {useFirebaseAPI} from '../../hooks';
import {OrderModel} from '../../services/models/appModels';
import MyOrders from '../../components/myOrders';
import QrCodeCamera from '../../components/QrCodeCamera';
import {useAppContext} from '../../services/context/AppContext';
import DeviceInfo from 'react-native-device-info';
const {width} = Dimensions.get('screen');
// import OpenSms from '@lowkey/react-native-open-sms';
const LandingScreen = () => {
  const [name, setName] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('-1');
  const [scanning, setScanning] = useState<boolean>(false);
  
  const styles = getStyles({width});
  const {addOrder, getAllOrders, myOrders} = useFirebaseAPI();
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

  const smsAvailable = async () => {
    return await SMS.isAvailableAsync();
  };

  const openSms = async (data: OrderModel, message: string = null) => {
    const isSmsAvailable = await smsAvailable();
    if (message !== 'error' && isSmsAvailable) {
      const {result} = await SMS.sendSMSAsync(
        '+971562546537',
        message.replace('{{Full Name}}', name),
      );
      console.log('resull', result);
      addOrder(data);
    }
  };

  const {isLoading: fetchQrCodeLoading, refetch: fetchQrCodeDetails} = useQuery(
    ['qrCodeInfo'],
    () => getIdByQrCode(qrCode),
    {
      retry: false,
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

        openSms(data, message);
      },
    },
  );

  useEffect(() => {
    if (qrCode.length > 0) {
      fetchQrCodeDetails();
    }
  }, [qrCode]);
  const handleQRCodeRead = (event: any) => {
    const qrId = event?.nativeEvent?.codeStringValue;
    setQrCode(qrId);
    setScanning(false);
  };
  console.log(fetchQrCodeLoading, 'myOrders');

  return (
    <View style={styles.container}>
      {fetchQrCodeLoading ? (
        <Text style={[styles.loadingText]}>Loading...</Text>
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
