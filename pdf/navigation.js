import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import theme from './utils/theme';
import TabBar from './components/TabBar';
import {SearchView, HistoryView, DetailView, FavoriteView} from './views';
import {Left, More} from './components/icons';
import {MyButton} from './components/shared';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const SearchStack = ({route, navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Search"
        component={SearchView}
        options={() => {
          return {
            headerShown: false,
          };
        }}
      />
      <HomeStack.Screen
        name="Detail"
        component={DetailView}
        options={({route, navigation}) => {
          return {
            title:
              (route.params?.keyword ?? '').slice(0, 15) +
              ((route.params?.keyword ?? '').length > 15 ? '...' : ''),
            headerStyle: {
              backgroundColor: theme.colors.softRed,
              // shadowColor: 'transparent', // for iOS
              elevation: 0, // for android
            },
            headerLeft: () => (
              <MyButton
                px={20}
                height="100%"
                onPress={() => navigation.navigate('Search')}>
                <Left width={24} height={24} color={theme.colors.textDark} />
              </MyButton>
            ),
            headerRight: () => (
              <MyButton
                px={20}
                height="100%"
                onPress={() => navigation.navigate('Search')}>
                <More height={24} width={24} color={theme.colors.textDark} />
              </MyButton>
            ),
            headerTitleAlign: 'center',
          };
        }}
      />
    </HomeStack.Navigator>
  );
};

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="History" component={HistoryView} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="Favorite" component={FavoriteView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
