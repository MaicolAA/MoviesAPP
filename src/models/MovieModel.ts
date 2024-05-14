import Realm from 'realm';

class Movie extends Realm.Object<Movie> {
  id!: number;
  title!: string;
  description!: string;
  year!: string;

  static schema = {
    name: 'Movie',
    properties: {
      id: 'int',
      title: 'string',
      description: 'string',
      year: 'string',
    },
    primaryKey: 'id',
  };
}

export default Movie;
