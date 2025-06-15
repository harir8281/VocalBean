import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import RecorderScreen from './src/screens/RecorderScreen';
import colors from './src/constants/colors';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <RecorderScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
