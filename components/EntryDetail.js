// EntryDetail.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

class EntryDetail extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired
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