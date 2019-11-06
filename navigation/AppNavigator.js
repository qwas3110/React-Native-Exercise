// AppNavigator.js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import TabNavigator from './MainTabNavigator';

export default createAppContainer(TabNavigator);