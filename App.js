'use strict';

import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SearchPage from './src/SearchPage'

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <SearchPage />
//     );
//   }
// }
const AppNavigator = createStackNavigator({
  Home: { screen: SearchPage }
});
export default createAppContainer(AppNavigator);





