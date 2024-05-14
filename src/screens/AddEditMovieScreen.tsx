import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import MovieForm from '../components/MovieForm';
import { getRealmInstance, createMovie, editMovie } from '../utils/realm';
import Movie from '../models/MovieModel';

type AddEditMovieScreenRouteProp = RouteProp<{ params: { movie?: Movie } }, 'params'>;

const AddEditMovieScreen = () => {
  const [realm, setRealm] = useState<Realm | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editMovieId, setEditMovieId] = useState<number | null>(null);

  const route = useRoute<AddEditMovieScreenRouteProp>();
  const navigation = useNavigation();

  useEffect(() => {
    getRealmInstance().then(realmInstance => {
      setRealm(realmInstance);
    });

    if (route.params?.movie) {
      const { movie } = route.params;
      setTitle(movie.title);
      setDescription(movie.description);
      setYear(movie.year);
      setIsEditing(true);
      setEditMovieId(movie.id);
    }

    return () => {
      if (realm) {
        realm.close();
      }
    };
  }, [route.params]);

  const handleSubmit = () => {
    if (realm) {
      if (isEditing && editMovieId !== null) {
        editMovie(realm, editMovieId, title, description, year);
      } else {
        createMovie(realm, title, description, year);
      }
      navigation.goBack();
    }
  };

  return (
    <View>
      <MovieForm
        title={title}
        description={description}
        year={year}
        setTitle={setTitle}
        setDescription={setDescription}
        setYear={setYear}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </View>
  );
};

export default AddEditMovieScreen;
