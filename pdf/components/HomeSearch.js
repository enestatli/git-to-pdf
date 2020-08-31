import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';

import Background from './Background';
import SvgLogo from './icons/Logo';
import SearchBox from './SearchBox';
import {Box} from './shared';

const HERO_HEIGHT = 230;

const HomeSearch = ({isSearchFocus, onSearchFocus}) => {
  const [bgOpacity] = useState(new Animated.Value(1));
  const [heroHeight] = useState(new Animated.Value(HERO_HEIGHT));

  useEffect(() => {
    if (isSearchFocus) {
      // Background Opacity
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 230,
        useNativeDriver: false,
      }).start();
      // Hero height
      Animated.timing(heroHeight, {
        toValue: 52 + 32,
        duration: 230,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 230,
        useNativeDriver: false,
      }).start();

      Animated.timing(heroHeight, {
        toValue: HERO_HEIGHT,
        duration: 230,
        useNativeDriver: false,
      }).start();
    }
  }, [bgOpacity, heroHeight, isSearchFocus]);

  return (
    <Box as={Animated.View} position="relative" zIndex={1} height={heroHeight}>
      <Box mt={-60} as={Animated.View} style={{opacity: bgOpacity}}>
        <Background pt={60} pb={26}>
          <Box flex={1} alignItems="center" justifyContent="center">
            <SvgLogo width={120} color="white" />
          </Box>
        </Background>
      </Box>

      {/* Search box */}
      <Box
        position="absolute"
        left={0}
        bottom={isSearchFocus ? 0 : -42}
        width="100%"
        p={16}>
        <SearchBox onChangeFocus={(status) => onSearchFocus(status)} />
      </Box>
    </Box>
  );
};

export default HomeSearch;
