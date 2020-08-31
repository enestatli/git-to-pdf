import React from 'react';

import {Box, MyText, MyButton} from './shared';

const CHARACTERS = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'â', 'î', 'û'];

const SpecialCharacters = ({onCharPress, ...props}) => {
  return (
    <Box
      height={48}
      flex={1}
      width="100%"
      bg="softGray"
      flexDirection="row"
      alignItems="center"
      {...props}>
      {CHARACTERS.map((char, index) => (
        <MyButton
          key={index}
          flex={1}
          height="100%"
          onPress={() => onCharPress(char)}>
          <MyText>{char}</MyText>
        </MyButton>
      ))}
    </Box>
  );
};

export default SpecialCharacters;
