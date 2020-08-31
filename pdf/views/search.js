/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback, useContext} from 'react';
import {StatusBar, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {useFocusEffect} from '@react-navigation/native';
// import Animated from 'react-native-reanimated';

import homeContext from '../context/home';
import searchContext from '../context/search';
import historyContext from '../context/history';

import SearchSuggestionList from '../components/SearchSuggestionList';
import SuggestionCard from '../components/SuggestionCard';
import SimpleItemList from '../components/SimpleItemList';
import HomeSearch from '../components/HomeSearch';
import {Box} from '../components/shared';

const SearchView = ({navigation}) => {
  const searchData = useContext(searchContext);
  const homeData = useContext(homeContext);
  const historyData = useContext(historyContext);
  const [isSearchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    homeData.setData();
    return () => {
      searchData.setKeyword('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(isSearchFocus ? 'white' : '#E11E3C');
    }, [isSearchFocus]),
  );

  return (
    <Box as={SafeAreaView} bg={isSearchFocus ? 'softRed' : 'red'} flex={1}>
      {/* Header */}
      <HomeSearch
        isSearchFocus={isSearchFocus}
        onSearchFocus={setSearchFocus}
      />

      {/* Content */}
      <Box flex={1} bg="softRed" pt={isSearchFocus ? 0 : 26}>
        {isSearchFocus ? (
          <Box flex={1}>
            {searchData.keyword.length >= 3 ? (
              <SearchSuggestionList
                onPress={(k) => navigation.navigate('Detail', {keyword: k})}
                keyword={searchData.keyword}
                data={searchData.suggestions}
              />
            ) : (
              <SimpleItemList
                onPress={(k) => navigation.navigate('Detail', {keyword: k})}
                data={historyData.history}
              />
            )}
          </Box>
        ) : (
          <Box px={16} py={40} flex={1}>
            <SuggestionCard
              title="Bir Kelime"
              data={homeData.data?.kelime}
              onPress={() =>
                navigation.navigate('Detail', {
                  keyword: homeData.data?.kelime?.madde,
                })
              }
            />

            <SuggestionCard
              mt={40}
              title="Bir Deyim - Atasözü"
              data={homeData.data?.atasoz}
              onPress={() =>
                navigation.navigate('Detail', {
                  keyword: homeData.data?.atasoz?.madde,
                })
              }
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchView;
