import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import COLORS from '../constants/colors';

const screenWidth = Dimensions.get('window').width;

const Headline = ({ scrollY }) => {
  const animatedFontSize = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, 200],
      [30, 20],
      Extrapolate.CLAMP
    );

    return {
      fontSize,
    };
  });

  const animatedBottomLine = useAnimatedStyle(() => {
    const borderBottomColor = interpolateColor(
      scrollY.value,
      [0, 200],
      [COLORS.bgPrimary, COLORS.acPrimary]
    );

    return {
      borderBottomColor,
    };
  });

  const animatedHeight = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 200],
      [70, 50],
      Extrapolate.CLAMP
    );

    return {
      height,
    };
  });

  const animatedTranslateXandY = useAnimatedStyle(() => {
    const width = interpolate(
      scrollY.value,
      [0, 200],
      [screenWidth * 0.9 - 95, 0],
      Extrapolate.CLAMP
    );

    return {
      width,
    };
  });

  return (
    <Animated.View
      style={[styles.container, animatedBottomLine, animatedHeight]}
    >
      <Animated.Text style={[styles.header, animatedFontSize]}>
        Wallet
      </Animated.Text>
      <Animated.View style={[animatedTranslateXandY]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderBottomWidth: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  header: {
    color: COLORS.fgPrimary,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});

export default Headline;
