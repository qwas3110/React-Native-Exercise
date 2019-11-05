// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from "./components/History";

const store = createStore(
    reducer,
    applyMiddleware(logger)
);


export default class App extends React.Component {
  componentDidMount() {
    console.log('begin');
    debugger;
    console.log('end');
  }
  render() {
    return (
       <Provider store={store}>
         <View style={{flex: 1}}>
           {/*<AddEntry />*/}
           <History/>
         </View>
       </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });