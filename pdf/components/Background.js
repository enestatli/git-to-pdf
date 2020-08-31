/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground} from 'react-native';

import bg from '../assets/bg.jpg';
import {Box} from './shared';

const Background = ({children, ...props}) => {
  return (
    <Box
      as={ImageBackground}
      source={bg}
      style={{width: '100%', height: '100%'}}
      {...props}>
      {children}
    </Box>
  );
};

export default Background;
