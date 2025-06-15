import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import RecordingsList from '../components/RecordingsList';
import RecordingPanel from '../components/RecordingPanel';
import RecordButton from '../components/RecordButton';
import useAudioRecorder from '../hooks/useAudioRecorder';
import useTimer from '../hooks/useTimer';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import colors from '../constants/colors';

interface Recording {
  id: string;
  title: string;
  time: string;
  duration: string;
  uri: string;
}

const RecorderScreen: React.FC = () => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    volumeData,
    recordedFile,
  } = useAudioRecorder();
  const [isPaused, setIsPaused] = React.useState(false);
  const [recordings, setRecordings] = React.useState<Recording[]>([]);
  const [recordStart, setRecordStart] = React.useState<Date | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioPlayer = React.useRef(new AudioRecorderPlayer()).current;
  const [currentlyPlayingId, setCurrentlyPlayingId] = React.useState<string | null>(null);
  const [timerResetKey, setTimerResetKey] = React.useState(0);
  const duration = useTimer(isRecording && !isPaused, timerResetKey);

  const handlePauseToggle = () => setIsPaused((prev) => !prev);

  const handleStart = async () => {
    await startRecording();
    setRecordStart(new Date());
    setIsPaused(false);
    setTimerResetKey((prev) => prev + 1);
  };

  const handleDone = async () => {
    const fileUri = await stopRecording();
    setIsPaused(false);
    setTimerResetKey((prev) => prev + 1);
    if (fileUri && recordStart) {
      const now = new Date();
      const mins = Math.floor((now.getTime() - recordStart.getTime()) / 60000);
      const secs = Math.floor(((now.getTime() - recordStart.getTime()) % 60000) / 1000);
      const pad = (n: number) => n.toString().padStart(2, '0');
      const rec: Recording = {
        id: Date.now().toString(),
        title: `Recording ${recordings.length + 1}`,
        time: now.toLocaleString(),
        duration: `${pad(mins)}:${pad(secs)}`,
        uri: fileUri,
      };
      setRecordings((prev) => [rec, ...prev]);
      setRecordStart(null);
    }
  };

  const handlePlayPause = async () => {
    if (isRecording) return;
    const last = recordings[0];
    if (!last || !last.uri) return;
    if (currentlyPlayingId && currentlyPlayingId !== last.id) {
      await audioPlayer.stopPlayer();
      setCurrentlyPlayingId(null);
      setIsPlaying(false);
    }
    if (!isPlaying || currentlyPlayingId !== last.id) {
      await audioPlayer.startPlayer(last.uri);
      setIsPlaying(true);
      setCurrentlyPlayingId(last.id);
      audioPlayer.addPlayBackListener((e) => {
        if (e.currentPosition >= e.duration) {
          setIsPlaying(false);
          setCurrentlyPlayingId(null);
          audioPlayer.stopPlayer();
        }
      });
    } else {
      await audioPlayer.pausePlayer();
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
    }
  };

  const handleListPlayPause = async (id: string) => {
    const rec = recordings.find(r => r.id === id);
    if (!rec || !rec.uri) return;
    if (currentlyPlayingId !== id) {
      await audioPlayer.startPlayer(rec.uri);
      setCurrentlyPlayingId(id);
      setIsPlaying(true);
      audioPlayer.addPlayBackListener((e) => {
        if (e.currentPosition >= e.duration) {
          setIsPlaying(false);
          setCurrentlyPlayingId(null);
          audioPlayer.stopPlayer();
        }
      });
    } else {
      await audioPlayer.pausePlayer();
      setIsPlaying(false);
      setCurrentlyPlayingId(null);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <SearchBar />
      <FilterTabs />
      <RecordingsList
        recordings={recordings}
        currentlyPlayingId={currentlyPlayingId || undefined}
        onPlayPause={handleListPlayPause}
      />
      <View style={styles.recordButtonContainer}>
        <RecordButton
          isRecording={isRecording}
          onStart={handleStart}
          onStop={handleDone}
        />
      </View>
      {isRecording && (
        <RecordingPanel
          isRecording={isRecording}
          isPaused={isPaused}
          duration={duration}
          volumeData={volumeData}
          onPauseToggle={handlePauseToggle}
          onDone={handleDone}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </View>
  );
};

export default RecorderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 12,
  },
  recordButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
});
