import React from 'react';

import {MyText, Box, MyButton} from '.';

const Card = ({children, ...props}) => {
  return (
    <MyButton bg="white" borderRadius="normal" py={16} px={12} {...props}>
      <Box flex={1} borderLeftWidth={3} borderLeftColor="light" pl={12}>
        {children}
      </Box>
    </MyButton>
  );
};

const Title = ({children}) => {
  return (
    <MyText fontSize={18} fontWeight="bold">
      {children}
    </MyText>
  );
};

const Summary = ({children}) => {
  return (
    <MyText color="textMedium" fontSize={14} mt={8}>
      {children}
    </MyText>
  );
};

Card.Title = Title;
Card.Summary = Summary;

export default Card;
