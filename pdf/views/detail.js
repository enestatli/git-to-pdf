import React, {useEffect, useCallback, useContext, useState} from 'react';
import {SafeAreaView, StatusBar, Platform, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Sound from 'react-native-sound';
import throttle from 'lodash/throttle';

import {favoriteContext, resultsContext, historyContext} from '../context';

import DetailSummaryItem from '../components/DetailSummaryItem';
import theme from '../utils/theme';
import ActionButton from '../components/ActionButton';
import SimpleCard from '../components/SimpleCard';
import DetailFocusBar from '../components/DetailFocusBar';

import {Box, MyText} from '../components/shared';
import {
  Sound as SoundIcon,
  SoundSolid as SoundIconSolid,
  Hand,
  Favorite,
  FavoriteSolid,
  Right,
} from '../components/icons';

const tabs = [
  {
    id: 'anlamlar',
    title: 'Açıklama',
  },
  {
    id: 'atasozu',
    title: ' Atasözleri & Deyimler',
  },
  {
    id: 'birlesikler',
    title: 'Birleşik Kelimeler',
  },
];

function DetailView({route, navigation}) {
  const keyword = route.params?.keyword;
  const resultsData = useContext(resultsContext);
  const history = useContext(historyContext);
  const favorites = useContext(favoriteContext);
  const [isPlaying, setPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const isFavorited = favorites.favorites.find((f) => f.title === keyword);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed);

      return function () {
        resultsData.clearResults();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      resultsData.getResults(keyword);
      return () => {
        resultsData.clearResults();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]),
  );

  useEffect(() => {
    history.addToHistory(keyword);
    setSelectedTab(tabs[0].id);
    //resultsData.getResults(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // do not forget *forceInset, mt={32} *flex={1}, scrollview mt={0}
  return (
    <Box as={SafeAreaView} forceInset={{top: 'never'}} bg="softRed" flex={1}>
      <DetailFocusBar
        onPress={(id) => setSelectedTab(id)}
        tabs={tabs}
        selected={selectedTab}
      />
      {/* Word */}
      <Box as={ScrollView} p={16} mt={0}>
        <Box>
          <MyText fontSize={32} fontWeight="bold">
            {keyword}
          </MyText>
          <MyText color="textLight" mt={6}>
            {resultsData.data?.telaffuz ? resultsData.data?.telaffuz + ' ' : ''}
            {resultsData.data?.lisan ?? ''}
          </MyText>
        </Box>
        {/* ActionButtons */}
        <Box flexDirection="row" mt={24}>
          <ActionButton
            disabled={resultsData.soundCode.length === 0}
            onPress={throttle(() => {
              const track = new Sound(
                `https://sozluk.gov.tr/ses/${resultsData.soundCode}.wav`,
                null,
                (e) => {
                  if (e) {
                    console.log('error loading track', e);
                  } else {
                    setPlaying(true);
                    track.play((s) => {
                      setPlaying(false);
                    });
                  }
                },
              );
            }, 500)}>
            {isPlaying ? (
              <SoundIconSolid width={24} height={24} color={theme.colors.red} />
            ) : (
              <SoundIcon
                width={24}
                height={24}
                color={
                  resultsData.soundCode.length > 0
                    ? isPlaying
                      ? theme.colors.red
                      : theme.colors.textLight
                    : theme.colors.softGray
                }
              />
            )}
          </ActionButton>
          <ActionButton
            ml={12}
            onPress={throttle(() => {
              if (isFavorited) {
                favorites.removeFromFavorites(keyword);
              } else {
                favorites.addToFavorites(keyword);
              }
            }, 500)}>
            {isFavorited ? (
              <FavoriteSolid width={24} height={24} color={theme.colors.red} />
            ) : (
              <Favorite width={24} height={24} color={theme.colors.textLight} />
            )}
          </ActionButton>
          <ActionButton
            disabled={keyword ? false : true}
            ml="auto"
            onPress={throttle(() => {
              resultsData.signSheet
                ? resultsData.closeSignSheet()
                : resultsData.openSignSheet(keyword);
            }, 500)}>
            <Hand
              width={24}
              height={24}
              color={
                resultsData.signSheet
                  ? theme.colors.red
                  : theme.colors.textLight
              }
            />
            <ActionButton.Title
              color={resultsData.signSheet ? 'red' : 'textLight'}>
              Türk İşaret Dili
            </ActionButton.Title>
          </ActionButton>
        </Box>
        {/* Content */}
        {selectedTab === tabs[0].id && (
          <Box mt={32} flex={1}>
            {(resultsData.data?.anlamlar ?? [1, 2, 3]).map((item) => (
              <DetailSummaryItem
                key={item?.id ?? item}
                data={typeof item === 'number' ? undefined : item}
                border={item.anlam_sira ?? item !== '1'}
              />
            ))}
          </Box>
        )}
        {/* Atasozu */}
        {selectedTab === tabs[1].id && (
          <Box mt={32 - 6} flex={1}>
            {(resultsData.data?.atasozu ?? []).map((item) => (
              <Box key={item.id} py={6}>
                <SimpleCard
                  onPress={() => {
                    navigation.navigate('Detail', {keyword: item.title});
                  }}>
                  <SimpleCard.Title pr={32}>{item.title}</SimpleCard.Title>
                  <Right
                    marginLeft="auto"
                    height={18}
                    width={18}
                    color={theme.colors.red}
                  />
                </SimpleCard>
              </Box>
            ))}
            <Box height={40} />
          </Box>
        )}
        {/* Birlesikler */}
        {selectedTab === tabs[2].id && (
          <Box mt={32 - 6} flex={1}>
            {(resultsData.data?.birlesikler ?? []).map((item) => (
              <Box key={item.id} py={6}>
                <SimpleCard
                  onPress={() => {
                    navigation.navigate('Detail', {keyword: item.title});
                  }}>
                  <SimpleCard.Title pr={32}>{item.title}</SimpleCard.Title>
                  <Right
                    marginLeft="auto"
                    height={18}
                    width={18}
                    color={theme.colors.red}
                  />
                </SimpleCard>
              </Box>
            ))}
            <Box height={40} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DetailView;
