/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import theme from '../utils/theme';
import {Search, RotateCcw, Favorite} from './icons';
import {Box, MyButton} from './shared';

const TabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Box
      pb={15}
      bg="white"
      flexDirection="row"
      style={
        {
          // elevation: 25,
          // shadowColor: '#000',
          // shadowOpacity: 0.16,
          // shadowRadius: 20,
        }
      }>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return label === 'Search' ? (
          /* Search Button */
          <Box key={label} p={15} mt={-15} bg="white" borderRadius="full">
            <MyButton size={56} bg="red" borderRadius="full" onPress={onPress}>
              <Search stroke="white" />
            </MyButton>
          </Box>
        ) : (
          /* Tab Buttons */
          <MyButton
            key={label}
            pt={6}
            flex={1}
            flexDirection="column"
            height={56}
            onPress={onPress}>
            {label === 'History' && (
              <RotateCcw
                color={isFocused ? theme.colors.red : theme.colors.gray}
              />
            )}
            {label === 'Favorite' && (
              <Favorite
                color={isFocused ? theme.colors.red : theme.colors.gray}
              />
            )}

            {/* indicator */}
            <Box
              size={4}
              borderRadius="full"
              bg={isFocused ? 'red' : 'white'}
              mt={6}
            />
          </MyButton>
        );
      })}
    </Box>
  );
};

export default TabBar;
