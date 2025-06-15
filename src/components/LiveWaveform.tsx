import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  volumeData: number[];
}

const LiveWaveform: React.FC<Props> = ({ volumeData }) => {
  // For now, fake waveform
  return (
    <View style={styles.container}>
      <Svg height="40" width="100%">
        <Path
          d="M0,20 Q10,10 20,20 T40,20 T60,20 T80,20 T100,20"
          stroke="#A0C4FF"
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default LiveWaveform;

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 8,
  },
});
