// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {createStore} from "redux";
import { Provider } from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';

export default class App extends React.Component {
  componentDidMount() {
    console.log('begin');
    debugger;
    console.log('end');
  }
  render() {
    return (
       <Provider store={createStore(reducer)}>
         <View style={{flex: 1}}>
           <AddEntry />
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