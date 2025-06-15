import { useEffect, useRef, useState } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [volumeData, setVolumeData] = useState<number[]>([]);
  const recorderPlayer = useRef(new AudioRecorderPlayer()).current;

  const startRecording = async () => {
    await recorderPlayer.startRecorder();
    recorderPlayer.addRecordBackListener((e) => {
      const volume = Math.abs(e.currentMetering || 0);
      setVolumeData((prev) => [...prev.slice(-60), volume]);
    });
    setIsRecording(true);
  };

  const stopRecording = async () => {
    await recorderPlayer.stopRecorder();
    recorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    setVolumeData([]);
  };

  return { isRecording, startRecording, stopRecording, volumeData };
};

export default useAudioRecorder;
