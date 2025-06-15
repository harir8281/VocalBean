import { useEffect, useRef, useState } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [volumeData, setVolumeData] = useState<number[]>([]);
  const recorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const [recordedFile, setRecordedFile] = useState<string | null>(null);

  const startRecording = async () => {
    const uri = await recorderPlayer.startRecorder();
    setRecordedFile(null);
    recorderPlayer.addRecordBackListener((e) => {
      const volume = Math.abs(e.currentMetering || 0);
      setVolumeData((prev) => [...prev.slice(-60), volume]);
    });
    setIsRecording(true);
    return uri;
  };

  const stopRecording = async () => {
    const result = await recorderPlayer.stopRecorder();
    recorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    setVolumeData([]);
    setRecordedFile(result);
    return result;
  };

  return { isRecording, startRecording, stopRecording, volumeData, recordedFile };
};

export default useAudioRecorder;
