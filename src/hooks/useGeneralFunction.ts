import {OrderModel} from '../services/models/appModels';
import {useAppContext} from '../services/context/AppContext';
import SendSMS from 'react-native-sms';

import useFirebaseAPI from './useFirebaseAPI';
import {Alert, Linking} from 'react-native';

const useGeneralFunctions = () => {
  const {addOrder} = useFirebaseAPI();
  const {state, dispatch} = useAppContext();
  const openSms = async (data: OrderModel, message: string, name: string) => {
    const isSmsAvailable = await Linking.canOpenURL(`sms:${data?.phoneNumber}`);
    console.log(isSmsAvailable,"isSmsAvailable");
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
  return {
    openSms,
  };
};
export default useGeneralFunctions;
