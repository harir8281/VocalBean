import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import LiveWaveform from './LiveWaveform';

interface Props {
  isRecording: boolean;
  isPaused: boolean;
  duration: string;
  volumeData: number[];
  onPauseToggle: () => void;
  onDone: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingPanel: React.FC<Props> = ({
  isRecording,
  isPaused,
  duration,
  volumeData,
  onPauseToggle,
  onDone,
  isPlaying,
  onPlayPause,
}) => {
  if (!isRecording && !isPlaying) return null;
  const handleWaveformPress = () => {
    if (isRecording) {
      onPauseToggle();
    } else {
      onPlayPause();
    }
  };
  return (
    <View style={styles.panel}>
      <TouchableOpacity style={styles.waveformContainer} onPress={handleWaveformPress} activeOpacity={0.7}>
        <LiveWaveform volumeData={volumeData} isPlaying={isPlaying} isRecording={isRecording} />
        <View style={styles.timerOverlay}>
          <Text style={styles.time}>{duration}</Text>
          {!isRecording && (
            <Text style={styles.playPauseIcon}>{isPlaying ? '⏸' : '▶'}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDone} style={styles.doneButton}>
        <Text style={styles.doneText}>✓ Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordingPanel;

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 40,
    left: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    alignItems: 'center',
    zIndex: 20,
  },
  waveformContainer: {
    width: 300,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  timerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    flexDirection: 'row',
  },
  time: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  doneButton: {
    backgroundColor: '#d1f5d3',
    borderRadius: 18,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 8,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  doneText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  playPauseIcon: {
    fontSize: 28,
    color: '#007AFF',
    marginLeft: 12,
  },
});