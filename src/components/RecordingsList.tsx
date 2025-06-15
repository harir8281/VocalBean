import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';

export interface Recording {
  id: string;
  title: string;
  time: string;
  duration: string;
  uri: string;
}

export interface RecordingsListProps {
  recordings: Recording[];
  currentlyPlayingId?: string;
  onPlayPause?: (id: string) => void;
}

const RecordingsList: React.FC<RecordingsListProps> = ({ recordings, currentlyPlayingId, onPlayPause }) => {
  const renderItem = ({ item }: { item: Recording }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.actionsRow}>
        {item.uri ? (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => onPlayPause && onPlayPause(item.id)}
          >
            <Text>{currentlyPlayingId === item.id ? '⏸' : '▶'} {item.duration}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.playButton, styles.disabledButton]}>
            <Text style={{ color: '#bbb' }}>No Audio</Text>
          </View>
        )}
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
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={recordings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

export default RecordingsList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
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
    width: '100%',
  },
  playButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 12,
  },
});
