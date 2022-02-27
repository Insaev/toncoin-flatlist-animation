import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import ListWithData from '../components/ListWithData';
import COLORS from '../constants/colors';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListWithData />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgPrimary,
  },
});

export default HomeScreen;
