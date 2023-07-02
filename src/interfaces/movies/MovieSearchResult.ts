import { GenreDetails } from "./GenreDetails";

export interface MovieSearchResult {
  id: number;
  title: string;
  /**
   * Only the unique part of the poster image path.
   * e.g. "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"
   */
  poster_path: string | null;
  /**
   * Complete image path that can be used to request the image.
   * e.g. "https://image.tmdb.org/t/p/w92/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg"
   * Generated by our code
   */
  complete_poster_path?: string;
  /**
   * Only the unique part of the backdrop image path.
   * e.g. "/hziiv14OpD73u9gAak4XDDfBKa2.jpg"
   */
  backdrop_path: string | null;
  /**
   * Complete image path that can be used to request the image.
   * e.g. "https://image.tmdb.org/t/p/w300/hziiv14OpD73u9gAak4XDDfBKa2.jpg"
   * Generated by our code
   */
  complete_backdrop_path?: string;
  release_date: string;
  genre_ids: number[];
  /**
   * We fetch all genres list for TMDB API
   * and search for genre_ids for this movie
   * to generate "genres" which contains id, string of genre (list)
   */
  genres?: GenreDetails[];
  // other data we don't care about
}
