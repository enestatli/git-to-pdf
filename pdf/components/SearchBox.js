/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {Keyboard, Animated} from 'react-native';

import {Search, Close} from './icons';
import {MyButton, MyText, Box, MyTextInput} from './shared';

import theme from '../utils/theme';
import searchContext from '../context/search';
import SpecialCharacters from './SpecialCharacters';

const SearchBox = ({onChangeFocus}) => {
  const searchData = useContext(searchContext);
  const [isFocus, setFocus] = useState(false);
  // const specialAnim = useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   console.log(value);
  // }, [value]);

  useEffect(() => {
    onChangeFocus(isFocus);
  }, [isFocus, onChangeFocus]);

  // useEffect(() => {
  //   onChangeFocus(isFocus);
  //   if (isFocus) {
  //     Animated.timing(specialAnim, {
  //       tovalue: 1,
  //       duration: 230,
  //       useNativeDriver: false,
  //     }).start();
  //   } else {
  //     Animated.timing(specialAnim, {
  //       tovalue: 0,
  //       duration: 230,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // }, [specialAnim, isFocus, onChangeFocus]);

  const onCancel = () => {
    searchData.setKeyword('');
    setFocus(false);
    Keyboard.dismiss();
  };

  const onClear = () => {
    searchData.setKeyword('');
  };

  return (
    <Box flexDirection="column" alignItems="center">
      <Box flexDirection="row" alignItems="center">
        <Box position="relative" flex={1}>
          <MyTextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 4,
              },
            }}
            bg="white"
            height={52}
            color="textDark"
            borderWidth={1}
            borderColor={isFocus ? '#D1D1D1' : 'transparent'}
            placeholder="Türkçe Sözlük’te Ara"
            placeholderTextColor="textMedium"
            pl={52}
            borderRadius="normal"
            value={searchData.keyword}
            onFocus={() => setFocus(true)}
            onChangeText={(text) => searchData.setKeyword(text)}
          />
          {searchData.keyword.length > 0 && (
            <MyButton onPress={onClear} position="absolute" right={16} top={14}>
              <Close color={theme.colors.textDark} />
            </MyButton>
          )}
          <MyButton position="absolute" left={16} top={14}>
            <Search color={theme.colors.textMedium} />
          </MyButton>
        </Box>
        {isFocus && (
          <MyButton onPress={onCancel} px={15} height={52}>
            <MyText>Vazgeç</MyText>
          </MyButton>
        )}
      </Box>
      {/* {isFocus && (
        <SpecialCharacters
          as={Animated.View}
          style={{
            marginTop: 12,
          }}
          height={24}
          onCharPress={char => searchData.setKeyword(searchData.keyword + char)}
        />
      )} */}
    </Box>
  );
};

export default SearchBox;
