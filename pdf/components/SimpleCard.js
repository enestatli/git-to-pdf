import React from 'react';

import {MyText, MyButton} from './shared';

const SimpleCard = ({children, ...props}) => {
  return (
    <MyButton
      justifyContent="flex-start"
      bg="white"
      borderRadius="normal"
      p={16}
      {...props}>
      {children}
    </MyButton>
  );
};

const Title = ({children, ...props}) => {
  return (
    <MyText fontSize={16} fontWeight="bold" {...props}>
      {children}
    </MyText>
  );
};

SimpleCard.Title = Title;

export default SimpleCard;
