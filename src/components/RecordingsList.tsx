import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const recordings = [
  {
    id: '1',
    title: 'Momentum in FIFA and Startup Strategy',
    time: 'Sep 3 · 12:30 PM',
    duration: '01:23',
  },
  {
    id: '2',
    title: 'Morning Sync on Video Messages to Prod and Express Payouts',
    time: 'Sep 3 · 12:30 PM',
    duration: '01:23',
  },
];

const RecordingsList = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.playButton}>
          <Text>▶ {item.duration}</Text>
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <Text>📋</Text>
          <Text>↗️</Text>
          <Text>📨</Text>
          <Text>⋯</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={recordings}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RecordingsList;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 12,
  },
});
