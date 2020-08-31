import React, {useCallback, useContext} from 'react';
import {StatusBar, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useFocusEffect} from '@react-navigation/native';

import {Left, Favorite} from '../components/icons';
import {Box, MyText, MyButton} from '../components/shared';
import favoriteContext from '../context/favorite';
import theme from '../utils/theme';
import SimpleItemList from '../components/SimpleItemList';

const FavoriteView = ({navigation}) => {
  const favorites = useContext(favoriteContext);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      //TODO setbgcolor to theme.colors.softRed
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed);
      return () => {
        favorites.setSelectable(false);
        favorites.updateSelectedList([]);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onLongPress = () => {
    favorites.setSelectable();
  };

  const onSelect = (item) => {
    if (favorites.selectedList.includes(item)) {
      favorites.updateSelectedList(
        favorites.selectedList.filter((el) => el !== item),
      );
    } else {
      favorites.updateSelectedList([...favorites.selectedList, item]);
    }
  };

  return (
    <Box as={SafeAreaView} flex={1} bg="softRed">
      <Box
        height={44}
        position="relative"
        width="100%"
        justifyContent="center"
        alignItems="center">
        <MyButton
          position="absolute"
          left={0}
          px={16}
          height="100%"
          onPress={() => navigation.navigate('Search')}>
          <Left height={24} color={theme.colors.textDark} />
        </MyButton>
        <MyText color="textDark">Favoriler</MyText>
      </Box>
      <Box flex={1}>
        {favorites.favorites.length > 0 ? (
          <Box flex={1} pb={20}>
            <SimpleItemList
              hasHeader={false}
              chevron={true}
              data={favorites.favorites}
              onSelect={onSelect}
              selectedList={favorites.selectedList}
              selectable={favorites.isSelectable}
              onLongPress={onLongPress}
              onPress={(k) => navigation.navigate('Detail', {keyword: k})}
            />
          </Box>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Favorite height={48} width={48} color={theme.colors.textLight} />
            <MyText mt={24} fontWeight="bold" color="textMedium">
              Henüz favori yok.
            </MyText>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavoriteView;
