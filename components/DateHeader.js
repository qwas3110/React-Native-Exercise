// DateHeader.js
import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const DateHeader = ({ date }) => {
    return <Text style={styles.dateText}>{date}</Text>;
};

DateHeader.propTypes = {
    date: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    dateText: {
        fontSize: 30
    }
});

export default DateHeader;