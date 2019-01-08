'use strict';

import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SearchPage from './src/SearchPage'
import SearchResults from './src/SearchResults'

const AppNavigator = createStackNavigator({
  Home: { screen: SearchPage },
 // Results:{ screen: SearchResults}
});
export default createAppContainer(AppNavigator);





