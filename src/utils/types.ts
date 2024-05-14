import Movie from "../models/MovieModel";

export type RootStackParamList = {
    MovieList: undefined;
    AddEditMovie: { movie?: Movie };
};
  