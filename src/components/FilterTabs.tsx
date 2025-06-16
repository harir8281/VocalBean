import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors';

const { width: screenWidth } = Dimensions.get('window');

const FilterTabs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tabsRow}>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>All</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Shared</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Starred</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: screenWidth * 0.012,
    marginRight: screenWidth * 0.01,
  },
  tab: {
    backgroundColor: '#23242a',
    borderRadius: 12,
    paddingHorizontal: screenWidth * 0.025,
    paddingVertical: screenWidth * 0.012,
    marginLeft: 0,
    minWidth: screenWidth * 0.14,
    alignItems: 'center',
  },
  tabText: {
    color: colors.white,
    
    fontSize: screenWidth * 0.030,
  },
});
