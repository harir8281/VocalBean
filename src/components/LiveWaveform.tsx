import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

interface Props {
  volumeData: number[];
  isRecording?: boolean;
  isPlaying?: boolean;
}

const LiveWaveform: React.FC<Props> = ({ volumeData }) => {
  const width = 300;
  const height = 48;
  const step = width / 59;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  // Multi-wave fallback animation
  const getWave = () => {
    const points = [];
    const t = animatedValue.__getValue ? animatedValue.__getValue() : 0;
    for (let i = 0; i < 60; i++) {
      const x = i * step;
      let y;
      if (volumeData && volumeData.length > 10 && volumeData.some(v => v > 1)) {
        // Use real audio data
        const v = volumeData[i] || 1;
        y = height / 2 - (v * (height / 2 - 8)) / 10;
      } else {
        // Multi-wave fallback
        const wave1 = Math.sin((i / 60) * 2 * Math.PI + t * 2 * Math.PI) * 10;
        const wave2 = Math.sin((i / 60) * 4 * Math.PI + t * 4 * Math.PI) * 6;
        const wave3 = Math.sin((i / 60) * 8 * Math.PI + t * 6 * Math.PI) * 3;
        y = height / 2 + wave1 + wave2 + wave3;
      }
      points.push({ x, y });
    }
    // Top path
    let path = `M${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x} ${points[i].y}`;
    }
    // Bottom path (mirror)
    for (let i = points.length - 1; i >= 0; i--) {
      const x = points[i].x;
      let y;
      if (volumeData && volumeData.length > 10 && volumeData.some(v => v > 1)) {
        const v = volumeData[i] || 1;
        y = height / 2 + (v * (height / 2 - 8)) / 10;
      } else {
        const wave1 = Math.sin((i / 60) * 2 * Math.PI + t * 2 * Math.PI) * 10;
        const wave2 = Math.sin((i / 60) * 4 * Math.PI + t * 4 * Math.PI) * 6;
        const wave3 = Math.sin((i / 60) * 8 * Math.PI + t * 6 * Math.PI) * 3;
        y = height / 2 - wave1 - wave2 - wave3;
      }
      path += ` L${x} ${y}`;
    }
    path += ' Z';
    return path;
  };

  // Animated SVG path
  const [animatedPath, setAnimatedPath] = React.useState('');
  useEffect(() => {
    const id = animatedValue.addListener(() => {
      setAnimatedPath(getWave());
    });
    return () => animatedValue.removeListener(id);
  });

  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={{ borderRadius: 24, overflow: 'hidden' }}>
        <Rect x={0} y={0} width={width} height={height} rx={24} fill="#F3F6FA" />
        <Path d={animatedPath} fill="#A0C4FF" opacity={0.9} />
      </Svg>
    </View>
  );
};

export default LiveWaveform;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 300,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
