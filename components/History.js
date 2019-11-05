// History.js
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity } from 'react-native';
import { white } from '../utils/colors';
import DateHeader from "./DateHeader";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';

import MetricCard from "./MetricCard";



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
        <View style={styles.item}>
            {today ? (
                <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>{today}</Text>
                </View>
            ) : (
                <TouchableOpacity onPress={() => console.log('Pressed!')}>
                    <MetricCard date={formattedDate} metrics={metrics} />
                </TouchableOpacity>
            )}
        </View>
    );
    //当天未记录渲染
    renderEmptyDate(formattedDate) {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>You didn't log any data this day</Text>
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


const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
});




const mapStateToProps = entries => ({ entries });

export default connect(mapStateToProps)(History);