import {OrderModel} from '../services/models/appModels';
import {useAppContext} from '../services/context/AppContext';
import SendSMS from 'react-native-sms';

import {Alert, Linking} from 'react-native';
import {PERMISSIONS, requestMultiple} from '@app/components';
const useGeneralFunctions = () => {
  const {dispatch} = useAppContext();
  const openSms = async (data: OrderModel, message: string, name: string) => {
    const isSmsAvailable = await Linking.canOpenURL('sms:');
    if (!isSmsAvailable) {
      Alert.alert('Does Not Support Sending Message');
      return false;
    } else if (message !== 'error') {
      SendSMS.send(
        {
          body: message.replace('{{Full Name}}', name),
          recipients: [data?.phoneNumber],
          successTypes: ['all', 'sent', 'queued', 'failed', 'outbox'],
          allowAndroidSendWithoutReadPermission: true,
        },
        (completed, cancelled, error) => {
          dispatch({type: 'SET_QRCODE', payload: undefined});
        },
      );
    }
  };

  const checkCameraPermission = () => {
    requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA])
      .then(statuses => {
        console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        if (
          statuses[PERMISSIONS.ANDROID.CAMERA] === 'blocked' ||
          statuses[PERMISSIONS.IOS.CAMERA] === 'blocked'
        ) {
          Alert.alert('Permission is blocked, please allow the permission');
          Linking.openSettings();
        }
      })
      .catch(error => {
        Alert.alert('Please enable the permission');
      });
  };
  return {
    openSms,
    checkCameraPermission,
  };
};
export default useGeneralFunctions;
