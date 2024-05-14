import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Realm from 'realm';
import MovieItem from '../components/MovieItem';
import { getRealmInstance, getMovies, deleteMovie } from '../utils/realm';
import Movie from '../models/MovieModel';
import { RootStackParamList } from '../utils/types';

const MovieListScreen = () => {
  const [realm, setRealm] = useState<Realm | null>(null);
  const [movies, setMovies] = useState<Realm.Results<Movie> | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const setupRealm = async () => {
      const realmInstance = await getRealmInstance();
      setRealm(realmInstance);
      const movies = realmInstance.objects<Movie>('Movie');
      setMovies(movies);

      const moviesListener = () => setMovies(realmInstance.objects<Movie>('Movie')); 
      movies.addListener(moviesListener);

      return () => {
        movies.removeListener(moviesListener);
        if (realmInstance) {
          realmInstance.close();
        }
      };
    };

    setupRealm();
  }, []);

  const handleDeleteMovie = (id: number) => {
    if (realm) {
      deleteMovie(realm, id);
    }
  };

  const handleEditMovie = (movie: Movie) => {
    navigation.navigate('ModifyMovie', { movie });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flat}
        data={movies ? Array.from(movies) : []}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <MovieItem item={item} onEdit={handleEditMovie} onDelete={handleDeleteMovie} />
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ModifyMovie', { movie: undefined })}>
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

export default MovieListScreen;
