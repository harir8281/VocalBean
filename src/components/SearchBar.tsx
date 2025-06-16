import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.askButton}>
        <Text style={styles.askText}>Ask AI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: width * 0.04,
    padding: width * 0.015,
    marginBottom: width * 0.02,
  },
  input: {
    flex: 1,
    color: colors.white,
    backgroundColor: '#23242a',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.025,
    paddingVertical: width * 0.015,
    fontSize: width * 0.038,
    marginRight: width * 0.02,
  },
  askButton: {
    backgroundColor: colors.primary,
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.015,
  },
  askText: {
    color: colors.white,
    fontSize: width * 0.035,
  },
});
