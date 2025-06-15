import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LiveWaveform from './LiveWaveform';
import colors from '../constants/colors';

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
      <View style={styles.waveformShadowBox}>
        <TouchableOpacity style={styles.waveformContainer} onPress={handleWaveformPress} activeOpacity={0.7}>
          <LiveWaveform volumeData={volumeData} isActive={isRecording && !isPaused} />
          <View style={styles.timerOverlay}>
            <Text style={styles.time}>{duration}</Text>
            {!isRecording && (
              <Text style={styles.playPauseIcon}>{isPlaying ? '⏸' : '▶'}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    zIndex: 20,
  },
  waveformShadowBox: {
    width: 320,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  waveformContainer: {
    width: 300,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.background,
    marginBottom: 0,
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
    color: colors.white,
    fontWeight: 'bold',
    backgroundColor: 'rgba(24,26,32,0.7)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  doneButton: {
    backgroundColor: '#1e2b2b',
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
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  playPauseIcon: {
    fontSize: 28,
    color: colors.primary,
    marginLeft: 12,
  },
});