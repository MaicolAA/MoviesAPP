import Movie from "../models/MovieModel";

export type RootStackParamList = {
    MovieList: undefined;
    ModifyMovie: { movie?: Movie };
};
  