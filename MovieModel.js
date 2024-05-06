import Realm from 'realm';

class Movie extends Realm.Object {}
Movie.schema = {
  name: 'Movie',
  properties: {
    id: 'int',
    title: 'string',
    description: 'string',
    year: 'string'
  },
};

export default Movie;
