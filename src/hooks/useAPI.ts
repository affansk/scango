import {useQuery} from '@tanstack/react-query';
import {getIdByQrCode} from '../services/api';

const useAPI = props => {
  const {authVar} = useAuth();

  const {
    data,
    refetch: getIdByQR,
    isLoading,
    isError,
  } = useQuery(['user', qrId], getIdByQrCode);

  return {
    getIdByQR,
  };
};
export default useAPI;
