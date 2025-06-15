import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import RecordingsList from '../components/RecordingsList';
import RecordingPanel from '../components/RecordingPanel';
import useTimer from '../hooks/useTimer';

const RecorderScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(true); // assume active
  const [isPaused, setIsPaused] = useState(false);
  const [volumeData, setVolumeData] = useState<number[]>([]); // for waveform

  const duration = useTimer(isRecording && !isPaused);

  const handlePauseToggle = () => setIsPaused(prev => !prev);
  const handleDone = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <SearchBar />
      <FilterTabs />
      <RecordingsList />
      {isRecording && (
        <RecordingPanel
          isRecording={isRecording}
          isPaused={isPaused}
          duration={duration}
          volumeData={volumeData}
          onPauseToggle={handlePauseToggle}
          onDone={handleDone}
        />
      )}
    </View>
  );
};

export default RecorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
});
