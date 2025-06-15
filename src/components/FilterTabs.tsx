import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FilterTabs = () => {
  return (
    <View style={styles.container}>
      {['All', 'Shared', 'Starred'].map(label => (
        <TouchableOpacity key={label} style={styles.tab}>
          <Text>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
});
