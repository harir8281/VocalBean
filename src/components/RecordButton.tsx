import React from 'react';
import { Pressable, StyleSheet, View, Animated } from 'react-native';

type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
};

const RecordButton: React.FC<Props> = ({ isRecording, onStart, onStop }) => {
  return (
    <Pressable
      onPress={isRecording ? onStop : onStart}
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        isRecording && styles.recording,
      ]}
    >
      <View style={styles.innerCircle} />
    </Pressable>
  );
};

export default RecordButton;

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  recording: {
    backgroundColor: '#C70039',
  },
  innerCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
});
