import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import colors from '../constants/colors';

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

const { width: screenWidth } = Dimensions.get('window');

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
            <Text style={styles.playText}>{currentlyPlayingId === item.id ? '⏸' : '▶'} {item.duration}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.playButton, styles.disabledButton]}>
            <Text style={styles.noAudioText}>No Audio</Text>
          </View>
        )}
        <View style={styles.iconGroup}>
          <Text style={styles.icon}>📋</Text>
          <Text style={styles.icon}>↗️</Text>
          <Text style={styles.icon}>📨</Text>
          <Text style={styles.icon}>⋯</Text>
        </View>
      </View>
    </View>
  );

  if (!recordings || recordings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recordings yet. Tap the mic to get started!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={recordings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
};

export default RecordingsList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  itemContainer: {
    padding: screenWidth * 0.025,
    borderBottomWidth: 1,
    borderColor: '#222',
    width: '98%',
    alignSelf: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  time: {
    fontSize: screenWidth * 0.025,
    color: colors.white,
  },
  title: {
    fontSize: screenWidth * 0.032,
    fontWeight: '600',
    marginVertical: 2,
    color: colors.white,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  playButton: {
    backgroundColor: '#222',
    padding: screenWidth * 0.012,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  playText: {
    color: colors.white,
    fontSize: screenWidth * 0.03,
  },
  noAudioText: {
    color: '#555',
    fontSize: screenWidth * 0.03,
  },
  disabledButton: {
    backgroundColor: '#333',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  icon: {
    color: colors.white,
    fontSize: screenWidth * 0.032,
    marginHorizontal: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  emptyText: {
    color: colors.white,
    fontSize: screenWidth * 0.035,
    textAlign: 'center',
    opacity: 0.7,
  },
});
