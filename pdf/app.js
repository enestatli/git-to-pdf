import React from 'react';
import {ThemeProvider} from 'styled-components';
import {SafeAreaProvider} from 'react-native-safe-area-view';

import theme from './utils/theme';
import Navigation from './navigation';
import {
  FavoriteProvider,
  HistoryProvider,
  HomeProvider,
  SearchProvider,
  ResultsProvider,
} from './context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <FavoriteProvider>
          <HistoryProvider>
            <HomeProvider>
              <SearchProvider>
                <ResultsProvider>
                  <Navigation />
                </ResultsProvider>
              </SearchProvider>
            </HomeProvider>
          </HistoryProvider>
        </FavoriteProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
