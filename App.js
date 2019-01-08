'use strict';

import React, {Component} from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SearchPage from './src/SearchPage'

const AppNavigator = createStackNavigator({
  Home: { screen: SearchPage }
});
export default createAppContainer(AppNavigator);





