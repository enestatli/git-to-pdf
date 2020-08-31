import React, {useContext} from 'react';

import theme from '../utils/theme';

import {favoriteContext} from '../context';

import {Trash} from './icons/';
import {Box, MyText, MyButton} from './shared';

const FavoritesModal = () => {
  const favorites = useContext(favoriteContext);

  return (
    <Box
      height="100%"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: -2,
        },
      }}>
      <Box
        flexDirection="column"
        bg="white"
        flex={1}
        mt={20}
        px={16}
        pt={24}
        pb={48}>
        <Box width="100%" flexDirection="row">
          <MyButton
            disabled={favorites.selectedList.length === 0}
            height={48}
            flex={1}
            mx={8}
            bg={favorites.selectedList.length === 0 ? 'light' : 'red'}
            borderRadius="normal"
            style={
              favorites.selectedList.length !== 0
                ? // eslint-disable-next-line react-native/no-inline-styles
                  {
                    shadowColor: theme.colors.red,
                    shadowOpacity: 0.32,
                    shadowRadius: 12,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                  }
                : {}
            }
            onPress={() => favorites.removeSelected()}>
            <Box pb={2}>
              <Trash
                color={
                  favorites.selectedList.length === 0
                    ? theme.colors.textLight
                    : 'white'
                }
                width={18}
                height={21}
              />
            </Box>
            <MyText
              ml={6}
              color={
                favorites.selectedList.length === 0 ? 'textLight' : 'white'
              }
              fontWeight="bold">
              {`Sil (${favorites.selectedList.length})`}
            </MyText>
          </MyButton>
          <MyButton
            mx={8}
            borderRadius="normal"
            height={48}
            bg="light"
            flex={1}
            onPress={() =>
              favorites.updateSelectedList(
                favorites.selectedList.length === favorites.favorites.length
                  ? []
                  : favorites.favorites,
              )
            }>
            <MyText fontWeight="bold" color="textMedium">
              {favorites.selectedList.length === favorites.favorites.length
                ? 'Seçimi Temizle'
                : 'Tümünü Seç'}
            </MyText>
          </MyButton>
        </Box>
        <Box width="100%">
          <MyButton
            mt={16}
            height={48}
            width="100%"
            onPress={() => favorites.setSelectable(false)}>
            <MyText fontWeight="bold" color="textLight">
              Vazgeç
            </MyText>
          </MyButton>
        </Box>
      </Box>
    </Box>
  );
};

export {FavoritesModal};
