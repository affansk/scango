import React, {Children} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeModules} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';
//const {StatusBarManager} = NativeModules;
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface QrCodeCameraProps {
  data?: Object;
}

const MyOrders: React.FC<QrCodeCameraProps> = ({data = []}: Props) => {
  type ItemProps = {dish: string; uuid: string};

  const Item = ({i}: ItemProps) => (
    <View style={styles.item} key={i?.uuid}>
      <Text style={styles.title}>{i?.dish}</Text>
    </View>
  );

  return (
    <View style={{marginTop: 29}}>
      <Text>Past Orders</Text>
      <FlatList
        data={data}
        renderItem={({item}) => <Item i={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 16,
  },
});
export default MyOrders;
