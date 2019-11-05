// TabNavigator.js
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import History from '../components/History';
import AddEntry from '../components/AddEntry';
import { purple, white } from '../utils/colors';

export default createBottomTabNavigator(
    {
        History: History,
        AddEntry: AddEntry
    },
    {
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0,0,0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);
