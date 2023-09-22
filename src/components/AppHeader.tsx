// import React from 'react';
// import {StyleProp, ViewStyle, View, StyleSheet, Pressable} from 'react-native';
// import {Text, TextVariants, scale} from '@app/components';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {TouchableRipple, useTheme} from 'react-native-paper';
// // import {Bb, Cross} from '@app/icons';
// import {IconButton} from 'react-native-paper';
// import {useDispatch} from 'react-redux';
// import {CommonActions, useNavigation} from '@react-navigation/native';
// import Routes from '@app/navigation/routes';
// // import {resetStorePolicy} from '@app/slice/PolicyStepSlice';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// interface HeaderProps {
//   onPress?: () => void;
//   headerType?: string;
//   isParentSpaceBetween?: string;
//   mainText?: string;
//   logo?: React.ReactNode;
//   isLogo?: boolean;
//   showBack?: boolean;
//   showOnlybackButton?: boolean;
//   onPressPP?: () => void;
//   onPressBack?: () => void;
//   showRight?: boolean;
//   style?: StyleProp<ViewStyle>;
//   isCusBkIcon?: boolean;
//   rightHeaderCustom?: JSX.Element;
//   rightHeader?: boolean;
// }
// const AppHeader: React.FC<HeaderProps> = (props: any) => {
//   const {
//     mainText = '',
//     logo = <></>,
//     isLogo = false,
//     isParentSpaceBetween = 'space-between',
//     showBack = false,
//     showOnlybackButton = false,
//     onPressPP,
//     onPressBack,
//     showRight = true,
//     style,
//     isCusBkIcon = false,
//     rightHeaderCustom,
//     rightHeader = false,
//     ...rest
//   } = props;
//   const {themeColor} = useTheme();
//   const styles = getStyles({themeColor});
//   const dispatch = useDispatch();
//   const navigation: any = useNavigation();
//   const showBackButton = () => {
//     return (
//       <TouchableRipple
//         onPress={onPressBack}
//         style={[styles.effectStyle, {marginRight: scale(20)}]}>
//         {!isCusBkIcon ? (
//           <Bb width={scale(16)} height={scale(16)} />
//         ) : (
//           <Cross width={scale(16)} height={scale(16)} />
//         )}
//       </TouchableRipple>
//     );
//   };

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: isParentSpaceBetween,
//         alignItems: 'center',
//         ...style,
//       }}>
//       {showOnlybackButton ? (
//         showBackButton()
//       ) : (
//         <>
//           <View>
//             {isLogo ? (
//               logo
//             ) : (
//               <View flexDirection={'row'} alignItems={'center'} style={{width:scale(270)}}>
//                 {showBack && showBackButton()}
//                 <Text
//                   // numberOfLines={1}
//                   variant={TextVariants.Gilroy_24pt_Light}
//                   style={{fontWeight: 400}}>
//                   {mainText}
//                 </Text>
//               </View>
//             )}
//           </View>
//           {rightHeader && !rightHeaderCustom ? (
//             <IconButton
//               icon="home"
//               // iconColor={MD3Colors.error50}
//               size={20}
//               onPress={() => {
//                 dispatch(resetStorePolicy());
//                 navigation.dispatch(
//                   CommonActions.reset({
//                     index: 0,
//                     routes: [{name: Routes.ROUTE_BOTTOM_NAVIGATOR}],
//                   }),
//                 );
//               }}
//             />
//           ) : rightHeader && rightHeaderCustom ? (
//             rightHeaderCustom
//           ) : (
//             showRight && (
//               <View>
//                 {/* <TouchableOpacity
//                   onPress={onPressPP}
//                   style={[styles.iconStyle, {}]}></TouchableOpacity> */}
//                 {/* <IconButton
//                   icon=""
//                   // iconColor={MD3Colors.error50}
//                   size={scale(50)}
//                   onPress={onPressPP}> */}
//                 <Pressable onPress={onPressPP}>
//                   <MaterialCommunityIcons
//                     name="account-circle"
//                     color={'#007B9D'}
//                     size={scale(50)}
//                   />
//                 </Pressable>
//                 {/* </IconButton> */}
//               </View>
//             )
//           )}
//         </>
//       )}
//     </View>
//   );
// };
// const getStyles = ({themeColor}: any) => {
//   const style = StyleSheet.create({
//     iconStyle: {
//       borderWidth: 0.5,
//       borderColor: 'grey',
//       height: scale(40),
//       width: scale(40),
//       borderRadius: 100,
//       backgroundColor: '#fff',
//     },
//     effectStyle: {
//       padding: scale(10),
//       borderRadius: scale(100),
//     },
//   });

//   return style;
// };
// export default AppHeader;
