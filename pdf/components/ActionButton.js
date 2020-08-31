import React from 'react';

import {MyText, MyButton} from './shared';

const ActionButton = ({children, ...props}) => {
  return (
    <MyButton
      bg="white"
      borderRadius="full"
      minWidth="actionButton"
      height="actionButton"
      px={12}
      style={{elevation: 3}}
      {...props}>
      {children}
    </MyButton>
  );
};

const Title = ({children, ...props}) => {
  return (
    <MyText mr={8} ml={8} fontWeight="bold" color="textLight" {...props}>
      {children}
    </MyText>
  );
};

ActionButton.Title = Title;

export default ActionButton;
