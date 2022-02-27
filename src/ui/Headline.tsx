import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import COLORS from '../constants/colors';

interface HeadlineProps {
  scrollY: Animated.SharedValue<number>;
}

const Headline = ({ scrollY }: HeadlineProps) => {
  const titleWidth = useSharedValue(0);
  const headerWidth = useSharedValue(0);
  const headerHeight = useSharedValue(0);

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

  const animatedHeaderHeight = useAnimatedStyle(() => {
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

  const animatedLogoTranslateXandY = useAnimatedStyle(() => {
    const bottom = interpolate(
      scrollY.value,
      [0, 200],
      [0, headerHeight.value / 2 - 10],
      Extrapolate.CLAMP
    );

    const left = interpolate(
      scrollY.value,
      [0, 200],
      [25, (headerWidth.value - titleWidth.value) / 2],
      Extrapolate.CLAMP
    );

    const fontSize = interpolate(
      scrollY.value,
      [0, 200],
      [30, 20],
      Extrapolate.CLAMP
    );

    return {
      bottom,
      left,
      fontSize,
    };
  });

  return (
    <Animated.View
      style={[styles.container, animatedBottomLine, animatedHeaderHeight]}
      onLayout={(e) => {
        headerWidth.value = e.nativeEvent.layout.width;
        headerHeight.value = e.nativeEvent.layout.height;
      }}
    >
      <Animated.Text
        style={[styles.header, animatedLogoTranslateXandY]}
        onLayout={(e) => (titleWidth.value = e.nativeEvent.layout.width)}
      >
        Wallet
      </Animated.Text>
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
    position: 'absolute',
    bottom: 0,
    left: 25,
  },
});

export default Headline;
