import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Movie from '../models/MovieModel';

type Props = {
  item: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
};

const MovieItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.note}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.year}</Text>
      <View style={{ height: 10 }} />
      <Button title="Edit" onPress={() => onEdit(item)} />
      <View style={{ height: 10 }} />
      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default MovieItem;
