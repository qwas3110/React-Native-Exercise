// History.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';

export class History extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };
    componentDidMount() {
        const { dispatch } = this.props;

        fetchCalendarResults()
            .then(entries => dispatch(receiveEntries(entries)))
            .then(entries => {
                if (!entries[timeToString()]) {
                    dispatch(
                        addEntry({
                            [timeToString()]: getDailyReminderValue()
                        })
                    );
                }
            });
    }
    render() {
        return (
            <View>
                <Text> {JSON.stringify(this.props)} </Text>
            </View>
        );
    }
}

const mapStateToProps = entries => ({ entries });

export default connect(mapStateToProps)(History);