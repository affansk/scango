import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {OrderModel} from '../services/models/appModels';
import {useAppContext} from '../services/context/AppContext';
const useFirebaseAPI = () => {
  const [myOrders, setMyOrders] = useState<any>([]);
  const ordersCollection = firestore().collection('Orders');
  const {state, dispatch} = useAppContext();
  const getAllOrders = async () => {
    firestore()
      .collection('Orders')
      // Filter results
      .where('uuid', '==', state?.uuid)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          const documentData = querySnapshot.docs.map(item => item?._data);
          setMyOrders(documentData);
        } else {
          // No document with the specified UUID found
          console.log('Document not found');
        }
      });
  };

  const addOrder = (orderData: OrderModel) => {
    console.log('orderData', orderData);
    ordersCollection
      .add(orderData)
      .then(docRef => {
        getAllOrders();
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };
  console.log('myOrders', myOrders);
  return {
    myOrders,
    addOrder,
    getAllOrders,
  };
};
export default useFirebaseAPI;
