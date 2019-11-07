// App.js
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Constants from 'expo-constants';
import { purple } from './utils/colors';
import {setLocalNotification} from "./utils/helpers";


import AppNavigator from "./navigation/AppNavigator";



const store = createStore(
    reducer,
    applyMiddleware(logger)
);




function UdacityStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}
UdacityStatusBar.propTypes = {
    backgroundColor: PropTypes.string.isRequired
};


export default class App extends React.Component {
  componentDidMount() {
   setLocalNotification()
  }
  render() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <UdacityStatusBar backgroundColor={purple} barStyle="light-content" />
                <AppNavigator />
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});