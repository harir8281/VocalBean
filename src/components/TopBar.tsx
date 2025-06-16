import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

const TopBar = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Vocalbean</Text>
        <View style={styles.icons}>
          <TouchableOpacity><Text style={styles.icon}>➕</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>📅</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>⚙️</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 10 : 0, 
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.015,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: colors.white,
  },
  icons: {
    flexDirection: 'row',
    gap: width * 0.03,
  },
  icon: {
    color: colors.white,
    fontSize: width * 0.05,
  },
});
