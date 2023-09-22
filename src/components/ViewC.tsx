import React from 'react';
import {View, ScrollView, ViewStyle} from 'react-native';

/**
 * @Component Flex
 * @description Flex Container with flex props to create containers
 * ## Usage
 * ```js
 * <Container.Flex><YourComponent/></Container.Flex>
 * <Container.Flex row><YourComponent/></Container.Flex>
 * <Container.Flex row alignItems='center'><YourComponent/></Container.Flex>
 * <Container.Flex row justifyContent='center'><YourComponent/></Container.Flex>
 * <Container.Flex row flexGrow={0.2}><YourComponent/></Container.Flex>
 *
 *
 */
const ViewC = (props: any) => {
  //TODO: add spacing logic
  const {scrollView = false, row, style = {}, ...rest} = props;

  /* Shorthand props */
  let custProps = {};

  const rowStyle = row ? {flexDirection: 'row'} : {};
  const flexGrow = scrollView ? 1 : row ? 0 : 1;

  const Component = scrollView ? ScrollView : View;

  return (
    // @ts-ignore
    <Component
      {...custProps}
      style={{...rest, ...rowStyle, flexGrow, ...(style as ViewStyle)}}>
      {props.children}
    </Component>
  );
};

ViewC.defaultProps = {
  row: false,
  scrollView: false,
};

export default ViewC;
