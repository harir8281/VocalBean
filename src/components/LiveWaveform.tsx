import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import colors from '../constants/colors';

interface Props {
  volumeData: number[];
  isActive: boolean;
}

const LiveWaveform: React.FC<Props> = ({ volumeData, isActive }) => {
  const width = Math.min(Dimensions.get('window').width - 40, 340);
  const height = 48;
  const barCount = 32;
  const barWidth = width / barCount;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [barHeights, setBarHeights] = useState<number[]>(Array(barCount).fill(height / 2));

  useEffect(() => {
    if (!isActive) return;
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue, isActive]);

  useEffect(() => {
    if (!isActive) return;
    const id = animatedValue.addListener(({ value }) => {
      let newHeights: number[];
      if (volumeData && volumeData.length > 10 && volumeData.some(v => v > 1)) {
        newHeights = volumeData.slice(-barCount).map(v => Math.max(8, (v / 10) * height));
        while (newHeights.length < barCount) newHeights.unshift(height / 2);
      } else {
        newHeights = Array(barCount).fill(0).map((_, i) => {
          return (
            height / 2 + Math.sin((i / barCount) * Math.PI * 2 + value * Math.PI * 2) * (height / 2 - 8)
          );
        });
      }
      setBarHeights(newHeights);
    });
    return () => animatedValue.removeListener(id);
  }, [animatedValue, volumeData, isActive]);

  return (
    <View style={[styles.container, { width, height }]}> 
      {barHeights.map((barHeight, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            {
              height: barHeight,
              width: barWidth * 0.7,
              marginLeft: i === 0 ? 0 : barWidth * 0.15,
              marginRight: i === barCount - 1 ? 0 : barWidth * 0.15,
            },
          ]}
        />
      ))}
    </View>
  );
};

export default LiveWaveform;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.background,
    marginBottom: 8,
  },
  bar: {
    backgroundColor: colors.white,
    borderRadius: 6,
  },
});
