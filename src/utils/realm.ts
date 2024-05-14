import Realm from 'realm';
import Movie from '../models/MovieModel';

export const getRealmInstance = async (): Promise<Realm> => {
  const realm = await Realm.open({
    schema: [Movie],
    deleteRealmIfMigrationNeeded: true,
  });
  return realm;
};

export const getMovies = (realm: Realm): Realm.Results<Movie> => {
  return realm.objects<Movie>('Movie');
};

export const createMovie = (realm: Realm, title: string, description: string, year: string): void => {
  realm.write(() => {
    realm.create('Movie', {
      id: new Date().getTime(),
      title,
      description,
      year,
    });
  });
};

export const deleteMovie = (realm: Realm, id: number): void => {
  realm.write(() => {
    const movieToDelete = realm.objects<Movie>('Movie').filtered(`id = ${id}`);
    realm.delete(movieToDelete);
  });
};

export const editMovie = (realm: Realm, id: number, title: string, description: string, year: string): void => {
  realm.write(() => {
    const movieToEdit = realm.objects<Movie>('Movie').filtered(`id = ${id}`)[0];
    if (movieToEdit) {
      movieToEdit.title = title;
      movieToEdit.description = description;
      movieToEdit.year = year;
    }
  });
};
