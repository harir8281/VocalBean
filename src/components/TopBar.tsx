import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TopBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App name</Text>
      <View style={styles.icons}>
        <TouchableOpacity><Text>➕</Text></TouchableOpacity>
        <TouchableOpacity><Text>📅</Text></TouchableOpacity>
        <TouchableOpacity><Text>⚙️</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    gap: 12,
  },
});
