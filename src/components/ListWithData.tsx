import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

import bip39 from '../constants/bip39'; // Big mocked data
import bipSmall from '../constants/bipSmall'; // Small mocked data
import OneListItem from '../ui/OneListItem';
import Headline from '../ui/Headline';
import COLORS from '../constants/colors';

const ListWithData = () => {
  const ITEM_HEIGHT: number = 170;
  const POST_PER_LOAD: number = 30;
  const [posts, setPosts] = useState<string[]>([]);
  const loading = useRef<boolean>(true);
  const startAfter = useRef<number>(0);
  const lastPost = useRef<boolean>(false);
  const bottomLineColor = useSharedValue<string>(COLORS.acPrimary);
  const scrollY = useSharedValue(0);

  // FlatList functions
  const renderItem = useCallback(({ item }) => <OneListItem text={item} />, []);

  const keyExtrator = useCallback(() => nanoid(), []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  // Getters functions
  const getPosts = useCallback(() => {
    loading.current = true;
    const postsData = bipSmall.slice(0, POST_PER_LOAD);
    setPosts((prevState) => [...prevState, ...postsData]);
    startAfter.current = POST_PER_LOAD;
    loading.current = false;
  }, []);

  const getMorePosts = useCallback(() => {
    if (!lastPost) {
      const postsData = bipSmall.slice(
        startAfter.current,
        startAfter.current + POST_PER_LOAD
      );
      setPosts((prevState) => [...prevState, ...postsData]);
      startAfter.current = startAfter.current + POST_PER_LOAD;
      postsData.length === 0
        ? (lastPost.current = true)
        : (lastPost.current = false);
    }
  }, [startAfter]);

  // Animation functions
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;

      if (
        event.layoutMeasurement.height + event.contentOffset.y >=
        event.contentSize.height - 20
      ) {
        bottomLineColor.value = COLORS.bgPrimary;
      } else {
        bottomLineColor.value = COLORS.acPrimary;
      }
    },
  });

  const bottomLineAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderTopColor: bottomLineColor.value,
    };
  });

  useEffect(() => {
    getPosts();
  }, []);

  if (loading.current) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Headline scrollY={scrollY} />
      <Animated.FlatList
        data={posts}
        extraData={posts}
        renderItem={renderItem}
        keyExtractor={keyExtrator}
        showsVerticalScrollIndicator={false}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={1} // для более плавной анимации на ios, но можно увеличить в пользу производительности
        ListFooterComponent={lastPost.current ? null : <ActivityIndicator />}
        getItemLayout={getItemLayout}
        onScroll={onScroll}
      />
      <Animated.View style={[styles.line, bottomLineAnimatedStyle]} />
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    borderTopWidth: 0.4,
  },
});

export default ListWithData;
