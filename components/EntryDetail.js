// EntryDetail.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

class EntryDetail extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
    };

    static navigationOptions = ({ navigation }) => {
        const entryId = navigation.getParam('entryId', 'No Id');

        const year = entryId.slice(0, 4);
        const month = entryId.slice(5, 7);
        const day = entryId.slice(8);

        return {
            title: `${month}/${day}/${year}`
        };
    };

    render() {
        return (
            <View>
                <Text>Entry Detail</Text>
                <Text>
                    EntryId: {this.props.navigation.getParam('entryId', 'No Id')}
                </Text>
            </View>
        );
    }
}

export default EntryDetail;