import React, {Children} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

interface QrCodeCameraProps {
  data?: Object;
}

const MyOrders: React.FC<QrCodeCameraProps> = ({data = []}: Props) => {
  type ItemProps = {dish: string; uuid: string};

  const Item = ({i}: ItemProps) => (
    <View style={styles.item} key={i?.uuid}>
      <Text key={i?.uuid} style={styles.title}>
        {i?.dish}
      </Text>
    </View>
  );

  return (
    <View style={{marginTop: 29}}>
      <Text style={[styles.pTitle]}>Past Orders</Text>
      <Text style={[styles.pTitle, {textAlign: 'center'}]}>Dish</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <Item i={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 16,
  },
  pTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default MyOrders;
