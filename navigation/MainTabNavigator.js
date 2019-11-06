// MainTabNavigator.js
import React from 'react';
import { Platform } from 'react-native';
import {
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator
} from 'react-navigation';
import EntryDetail from "../components/EntryDetail";
import History from "../components/History";
import AddEntry from "../components/AddEntry";
import { purple, white } from '../utils/colors';

import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons
                    name={isIOS ? 'ios-bookmarks' : 'md-bookmarks'}
                    size={30}
                    color={tintColor}
                />
            )
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="plus-square" size={30} color={tintColor} />
            )
        }
    }
};


const tabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    defaultNavigationOptions: {
        bounces: true
    },
    tabBarOptions: {
        activeTintColor: isIOS ? purple : white,
        style: {
            height: isIOS ? 56 : 70,
            backgroundColor: isIOS ? white : purple,
            shadowColor: 'rgba(0,0,0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        },
        labelStyle: {
            fontSize: isIOS ? 11 : 12
        },
        tabStyle: {
            marginTop: isIOS ? 0 : 5
        },
        showIcon: true
    }
};



const Tabs = isIOS
    ? createBottomTabNavigator(routeConfigs, tabNavigatorConfig)
    : createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);

// export default Tabs;


const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }
    }
});

export default MainNavigator;







// export default createBottomTabNavigator(
//     {
//         History: History,
//         AddEntry: AddEntry
//     },
//     {
//         tabBarOptions: {
//             activeTintColor: Platform.OS === 'ios' ? purple : white,
//             style: {
//                 height: 56,
//                 backgroundColor: Platform.OS === 'ios' ? white : purple,
//                 shadowColor: 'rgba(0,0,0, 0.24)',
//                 shadowOffset: {
//                     width: 0,
//                     height: 3
//                 },
//                 shadowRadius: 6,
//                 shadowOpacity: 1
//             }
//         }
//     }
// );
