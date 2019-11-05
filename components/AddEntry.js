// AddEntry.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { white, purple } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { getMetricMetaInfo, timeToString,getDailyReminderValue } from '../utils/helpers';
import {submitEntry,removeEntry} from "../utils/api";

import { connect } from 'react-redux';
import {addEntry} from "../actions";

import UdaciSlider from "./UdaciSlider";
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";


import { FontAwesome } from '@expo/vector-icons';


const SubmitBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={
                Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
            }
            onPress={onPress}
        >
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    );
};


SubmitBtn.propTypes = {
    onPress: PropTypes.func.isRequired
};


class AddEntry extends Component {
    static propTypes = {
        alreadyLogged: PropTypes.bool,
        addEntry: PropTypes.func.isRequired
    };

    // static navigationOptions = {
    //     tabBarLabel: 'Add Entry',
    //     tabBarIcon: ({ tintColor }) => (
    //         <FontAwesome name="plus-square" size={30} color={tintColor} />
    //     )
    // };


    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    };


    submit = () => {
        const key = timeToString();
        const entry = this.state;

        // Update Redux
        this.props.addEntry({
            [key]: entry
        });

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        });

        // Navigate to home

        submitEntry({ key, entry });

        // Clear local notification
    };
    reset = () => {
        const key = timeToString();

        // Update Redux
        this.props.addEntry({
            [key]: getDailyReminderValue()
        });

        // Route to Home

        removeEntry(key);
    };


    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count,
            }
        })
    };
    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            }
        })
    };
    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    };


    render() {
        const metaInfo = getMetricMetaInfo();

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                        size={100}
                    />
                    <Text>You already logged your information for today.</Text>
                    <TextButton style={{ padding: 10 }} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <DateHeader date={new Date().toLocaleDateString()} />
                {Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider' ? (
                                <UdaciSlider
                                    value={value}
                                    onChange={value => this.slide(key, value)}
                                    {...rest}
                                />
                            ) : (
                                <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />
                            )}
                        </View>
                    );
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    }
});


function mapStateToProps(state) {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    };
}

export default connect(
    mapStateToProps,
    { addEntry }
)(AddEntry);