import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import RecorderScreen from './src/screens/RecorderScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <RecorderScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});
