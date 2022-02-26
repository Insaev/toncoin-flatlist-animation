import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

const OneListItem = ({ text }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.bgSecondary,
    marginVertical: 10,
    borderRadius: 15,
    width: width - 40,
    height: 150,
  },
  textStyle: {
    textAlign: 'center',
    color: COLORS.fgPrimary,
    fontSize: 24,
  },
});

export default OneListItem;
