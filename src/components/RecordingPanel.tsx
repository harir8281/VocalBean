import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface Props {
  isRecording: boolean;
  isPaused: boolean;
  duration: string;
  onPauseToggle: () => void;
  onDone: () => void;
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingPanel: React.FC<Props> = ({
  isRecording,
  isPaused,
  duration,
  onPauseToggle,
  onDone,
}) => {
  const [volumeData, setVolumeData] = useState<number[]>(Array(50).fill(1)); // Initial flat waveform
  const animatedValue = useState(new Animated.Value(0))[0]; // For waveform animation

  // Start recording and listen to audio levels
  useEffect(() => {
    if (isRecording && !isPaused) {
      const startRecording = async () => {
        try {
          await audioRecorderPlayer.startRecorder();
          audioRecorderPlayer.addRecordBackListener((e) => {
            const volume = Math.min(e.currentMetering || 0, 10); // Normalize volume (0-10)
            setVolumeData((prev) => {
              const newData = [...prev.slice(1), volume]; // Shift data for animation
              return newData;
            });
          });
        } catch (error) {
          console.error('Recording failed:', error);
        }
      };
      startRecording();
    } else if (isPaused) {
      audioRecorderPlayer.pauseRecorder();
    }

    return () => {
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, [isRecording, isPaused]);

  // Waveform animation loop
  useEffect(() => {
    if (isRecording && !isPaused) {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      animatedValue.setValue(0);
    }
  }, [isRecording, isPaused, animatedValue]);

  if (!isRecording) return null;

  // Generate SVG path for waveform
  const generateWaveformPath = () => {
    const width = 300;
    const height = 40;
    const step = width / (volumeData.length - 1);
    let path = `M0 ${height / 2} `;
    
    volumeData.forEach((value, index) => {
      const x = index * step;
      const y = height / 2 - (value * (height / 2)) / 10; // Scale amplitude
      path += `L${x} ${y} `;
    });

    path += `L${width} ${height / 2}`;
    return path;
  };

  return (
    <View style={styles.panel}>
      <Svg height="40" width="300" style={styles.waveform}>
        <Path
          d={generateWaveformPath()}
          stroke="#007AFF"
          strokeWidth="2"
          fill="none"
          translateX={animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -10], // Slight horizontal shift for animation
          })}
        />
      </Svg>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPauseToggle}>
          <Text style={styles.time}>{isPaused ? '▶' : '⏸'} {duration}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone} style={styles.doneButton}>
          <Text style={styles.doneText}>✅ Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordingPanel;

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    alignItems: 'center',
  },
  waveform: {
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  time: {
    fontSize: 18,
    color: '#000',
  },
  doneButton: {
    backgroundColor: '#d1f5d3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  doneText: {
    color: 'green',
    fontWeight: 'bold',
  },
});