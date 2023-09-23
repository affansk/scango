import {OrderModel} from '../services/models/appModels';
import {useAppContext} from '../services/context/AppContext';
import SendSMS from 'react-native-sms';
import useFirebaseAPI from './useFirebaseAPI';

const useGeneralFunctions = () => {
  const {addOrder} = useFirebaseAPI();
  const {state, dispatch} = useAppContext();
  const openSms = async (data: OrderModel, message: string, name: string) => {
    if (message !== 'error') {
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
