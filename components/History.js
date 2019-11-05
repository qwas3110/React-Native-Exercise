// History.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';




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
    // 渲染数据
    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View>
            {today ? (
                <Text>{JSON.stringify(today)}</Text>
            ) : (
                <Text>{JSON.stringify(metrics)}</Text>
            )}
        </View>
    );
    //当天未记录渲染
    renderEmptyDate(formattedDate) {
        return (
            <View>
                <Text>No data for this day</Text>
            </View>
        );
    }



    render() {
        const { entries } = this.props;
        return (
            <UdaciFitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        );
    }
}

const mapStateToProps = entries => ({ entries });

export default connect(mapStateToProps)(History);