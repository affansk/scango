// import React from 'react';
// import {Text as RNText} from 'react-native';
// import {useAppTheme} from '@app/theme/src';
// import {TextVariants} from '@app/components/TextVariants';
// //import {scale} from 'react-native-size-matters';
// import {scale} from 'react-native-utils-scale';

// //const { fontScale, deviceWidth, deviceHeight } = dimensionsScale;
// /**
//  *
//  * @Component Text
//  * @description
//  * Text component used instead of RN default Text component across apps
//  *
//  * ## Usage
//  * ```js
//     <Text style={styles.paddingBottom16} variant={TextVariants.HeadLine1}>
//       Welcome To ZED
//     </Text> *
//  */

// type TextProps = {
//   variant?: string;
//   color?: string;
//   style?: Object;
// };

// const getStyle = (props: TextProps) => {
//   const theme = useAppTheme();
//   const {variant, color} = props;
//   const markProBold = {...theme.fonts.markProBold};
//   const markProRegular = {...theme.fonts.markProRegular};
//   const notoSansBold = {...theme.fonts.notoSansBold};
//   const notoSansRegular = {...theme.fonts.notoSansRegular};
//   const notoSansLight = {...theme.fonts.notoSansLight};
//   const notoSansMedium = {...theme.fonts.notoSansMedium};
//   const gilRoyLight = {...theme.fonts.gilRoyLight};
//   const gilRoyBold = {...theme.fonts.gilRoyBold};
//   const gilRoyMedium = {...theme.fonts.gilRoyMedium};
//   const defaultStyle = {
//     color: color ? color : theme.main.secondary,
//   };

//   const fontStyles = {
//     [TextVariants.Mark_Pro_4pt_Regular]: {
//       fontSize: 4,
//     },
//     [TextVariants.Mark_Pro_8pt_Regular]: {
//       fontSize: 8,
//       lineHeight: 14,
//     },
//     [TextVariants.Mark_Pro_12pt_Regular]: {
//       fontSize: 12,
//       lineHeight: 18,
//     },
//     [TextVariants.Mark_Pro_12pt_Bold]: {
//       fontSize: 12,
//       lineHeight: 18,
//     },
//     [TextVariants.Mark_Pro_14pt_Bold]: {
//       fontSize: 14,
//       lineHeight: 20,
//     },
//     [TextVariants.Mark_Pro_16pt_Bold]: {
//       fontSize: 16,
//       lineHeight: 22,
//     },
//     [TextVariants.Mark_Pro_20pt_Bold]: {
//       fontSize: 20,
//       lineHeight: 28,
//     },
//     [TextVariants.Mark_Pro_24pt_Bold]: {
//       fontSize: 24,
//       lineHeight: 30,
//     },
//     [TextVariants.Mark_Pro_26pt_Bold]: {
//       fontSize: 26,
//       lineHeight: 32,
//     },
//     [TextVariants.Mark_Pro_32pt_Bold]: {
//       fontSize: 32,
//       lineHeight: 38,
//     },
//     [TextVariants.Mark_Pro_56pt_Bold]: {
//       fontSize: 56,
//       lineHeight: 70,
//     },
//     [TextVariants.Mark_Pro_CAPS_14pt_Bold]: {
//       fontSize: 14,
//       lineHeight: 20,
//       textTransform: 'uppercase',
//     },
//     [TextVariants.Mark_Pro_18pt_Regular]: {
//       ...markProRegular,
//       fontSize: 18,
//       lineHeight: 24,
//     },
//     [TextVariants.Mark_Pro_20pt_Regular]: {
//       ...notoSansRegular,
//       fontSize: 20,
//       lineHeight: 28,
//     },
//     [TextVariants.Mark_Pro_36pt_Bold]: {
//       fontSize: 36,
//       lineHeight: 44,
//     },
//     [TextVariants.Noto_Sans_14pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 14,
//       lineHeight: 18,
//     },
//     [TextVariants.Noto_Sans_16pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 16,
//       lineHeight: 22,
//     },
//     [TextVariants.Noto_Sans_18pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 18,
//       lineHeight: 24,
//     },
//     [TextVariants.Noto_Sans_24pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 24,
//       lineHeight: 28,
//     },
//     [TextVariants.Noto_Sans_16pt_Bold_CAPS]: {
//       ...notoSansBold,
//       fontSize: 16,
//       lineHeight: 22,
//       textTransform: 'uppercase',
//     },
//     [TextVariants.Noto_Sans_Bold_28pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 28,
//       lineHeight: 32,
//     },
//     [TextVariants.Noto_Sans_10pt_Bold_CAPS]: {
//       ...notoSansBold,
//       fontSize: 10,
//       lineHeight: 14,
//       textTransform: 'uppercase',
//     },
//     [TextVariants.Noto_Sans_10pt_Regular]: {
//       ...notoSansRegular,
//       fontSize: 10,
//     },
//     [TextVariants.Noto_Sans_12pt_Regular]: {
//       ...notoSansRegular,
//       fontSize: 12,
//     },
//     [TextVariants.Noto_Sans_10pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 10,
//     },
//     [TextVariants.Noto_Sans_12pt_Bold]: {
//       ...notoSansBold,
//       fontSize: 12,
//     },
//     [TextVariants.Noto_Sans_14pt_Regular]: {
//       ...notoSansRegular,
//       fontSize: 14,
//       lineHeight: 18,
//     },
//     [TextVariants.Noto_Sans_16pt_Regular]: {
//       ...notoSansRegular,
//       fontSize: 16,
//       lineHeight: 22,
//     },
//     [TextVariants.Noto_Sans_16pt_Light]: {
//       ...notoSansLight,
//       fontSize: 16,
//       lineHeight: 22,
//     },
//     [TextVariants.Noto_Sans_18pt_Regular]: {
//       ...notoSansRegular,
//       fontSize: 18,
//       lineHeight: 24,
//     },
//     [TextVariants.Noto_Sans_18pt_Light]: {
//       ...notoSansLight,
//       fontSize: 18,
//       lineHeight: 24,
//     },
//     [TextVariants.Noto_Sans_20pt_Light]: {
//       ...notoSansLight,
//       fontSize: 20,
//       lineHeight: 28,
//     },
//     [TextVariants.Noto_Sans_28pt_Light]: {
//       ...notoSansLight,
//       fontSize: 28,
//       lineHeight: 32,
//     },
//     [TextVariants.Noto_Sans_10pt_Regular_CAPS]: {
//       ...notoSansRegular,
//       fontSize: 10,
//       lineHeight: 14,
//       textTransform: 'uppercase',
//     },
//     [TextVariants.Noto_Sans_14pt_Medium_CAPS]: {
//       ...notoSansMedium,
//       fontSize: 14,
//       lineHeight: 18,
//       textTransform: 'uppercase',
//     },
//     [TextVariants.Noto_Sans_24pt_Light]: {
//       ...notoSansLight,
//       fontSize: 24,
//       lineHeight: 28,
//     },
//     [TextVariants.Noto_Sans_20pt_Medium]: {
//       ...notoSansMedium,
//       fontSize: 20,
//       lineHeight: 28,
//     },
//     [TextVariants.Noto_Sans_14pt_Light]: {
//       ...notoSansLight,
//       fontSize: 14,
//     },
//     [TextVariants.Noto_Sans_16pt_Medium]: {
//       ...notoSansMedium,
//       fontSize: 16,
//     },
//     [TextVariants.Noto_Sans_12pt_Medium]: {
//       ...notoSansMedium,
//       fontSize: scale(12),
//     },
//     [TextVariants.Gilroy_16pt_Light]: {
//       ...gilRoyLight,
//       fontSize: scale(14),
//     },
//     [TextVariants.Gilroy_16pt_Bold]: {
//       ...gilRoyBold,
//       fontSize: scale(16),
//       fontWeight: 600,
//     },
//     [TextVariants.Gilroy_32pt_Light]: {
//       ...gilRoyLight,
//       fontSize: scale(26),
//     },
//     [TextVariants.Gilroy_12pt_Light]: {
//       ...gilRoyLight,
//       fontSize: scale(12),
//     },
//     [TextVariants.Gilroy_14pt_Light]: {
//       ...gilRoyLight,
//       fontSize: scale(14),
//     },
//     [TextVariants.Gilroy_24pt_Light]: {
//       ...gilRoyLight,
//       fontSize: scale(22),
//     },
//     [TextVariants.Gilroy_14pt_Medium]: {
//       ...gilRoyMedium,
//       fontSize: scale(14),
//     },
//     [TextVariants.Gilroy_16pt_Medium]: {
//       ...gilRoyMedium,
//       fontSize: scale(16),
//     },
//   };

//   const defaultMarkProBold = {
//     ...markProBold,
//     ...defaultStyle,
//   };

//   return [
//     defaultMarkProBold,
//     variant ? fontStyles[variant] : fontStyles.Mark_Pro_16pt_Bold,
//   ];
// };
// const Text = (props: any): JSX.Element => {
//   const {children} = props;

//   return (
//     <RNText {...props} style={[props.style, getStyle(props)]}>
//       {children}
//     </RNText>
//   );
// };

// export default Text;
