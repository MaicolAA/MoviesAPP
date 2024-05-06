import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Realm from 'realm';
import Movie from './MovieModel';

const App = () => {
  const [realm, setRealm] = useState<Realm | null>(null);
  const [movies, setMovies] = useState<Realm.Results<any>>();
  const [isAddingMovie, setIsAddingMovie] = useState<boolean>(false);
  const [isEditingMovie, setIsEditingMovie] = useState<boolean>(false);
  const [editMovieId, setEditMovieId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [year, setYear] = useState<string>('');

  useEffect(() => {
    let realmInstance: Realm | null = null;
    Realm.open({
      schema: [Movie],
      deleteRealmIfMigrationNeeded: true,
    }).then(realm => {
      realmInstance = realm;
      setRealm(realmInstance);
      setMovies(realmInstance.objects<Movie>('Movie'));
    });

    return () => {
      if (realmInstance !== null && !realmInstance.isClosed) {
        realmInstance.close();
      }
    };
  }, []);

  const createMovie = () => {
    if (realm !== null) {
      realm.write(() => {
        const newMovie = realm.create('Movie', {
          id: new Date().getTime(),
          title,
          description,
          year
        });
        setMovies(realm.objects<Movie>('Movie'));
      });
      setTitle('');
      setDescription('');
      setYear('');
      setIsAddingMovie(false);
    }
  };

  const deleteMovie = (id: number) => {
    if (realm !== null) {
      realm.write(() => {
        const movieToDelete = realm.objects<Movie>('Movie').filtered(`id = ${id}`);
        realm.delete(movieToDelete);
        setMovies(realm.objects<Movie>('Movie'));
      });
    }
  };

  const editMovie = () => {
    if (realm !== null && editMovieId !== null) {
      realm.write(() => {
        const movieToEdit = realm.objects<Movie & {title: string, description: string, year: string}>('Movie').filtered(`id = ${editMovieId}`)[0];
        if (movieToEdit) {
          movieToEdit.title = title;
          movieToEdit.description = description;
          movieToEdit.year = year;
          setMovies(realm.objects<Movie>('Movie'));
        }
      });
      setTitle('');
      setDescription('');
      setYear('');
      setIsEditingMovie(false);
    }
  };

  const renderMovieItem = ({ item }: { item: Realm.Object & { id: number, title: string, description: string, year: string } }) => (
    <View style={styles.note}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.year}</Text>
      <View style={{ height: 10 }} />
      <Button title="Edit" onPress={() => {
        setTitle(item.title);
        setDescription(item.description);
        setYear(item.year);
        setIsEditingMovie(true);
        setEditMovieId(item.id);
      }} />
      <View style={{ height: 10 }} /> 
      <Button title="Delete" onPress={() => deleteMovie(item.id)} />
    </View>
  );

  const openAddMovieScreen = () => {
    setIsAddingMovie(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flat}
        data={movies ? Array.from(movies) : []}
        keyExtractor={item => String(item.id)}
        renderItem={renderMovieItem}
      />
      {(isAddingMovie || isEditingMovie) && (
        <View style={styles.overlay}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            value={year}
            onChangeText={text => setYear(text)}
          />

          <Button title={isAddingMovie ? "Save" : "Update"} onPress={isAddingMovie ? createMovie : editMovie} />
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={openAddMovieScreen}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flat: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
  },
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFFE6',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10 
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },

});


export default App;
