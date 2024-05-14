import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  title: string;
  description: string;
  year: string;
  setTitle: (text: string) => void;
  setDescription: (text: string) => void;
  setYear: (text: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
};

const MovieForm: React.FC<Props> = ({ title, description, year, setTitle, setDescription, setYear, onSubmit, isEditing }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
      />
      <Button title={isEditing ? "Update" : "Save"} onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default MovieForm;
