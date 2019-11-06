// EntryDetail.js
import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { white } from '../utils/colors';
import MetricCard from '../components/MetricCard';



class EntryDetail extends Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        metrics: PropTypes.object.isRequired,
        entryId: PropTypes.string.isRequired,
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
        const { metrics, entryId } = this.props;

        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics} />
                <Text>EntryId: {entryId}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
});

const mapStateToProps = (state, { navigation }) => {
    const entryId = navigation.getParam('entryId', 'No Id');

    return {
        entryId,
        metrics: state[entryId]
    };
};


export default connect(mapStateToProps)(EntryDetail);
