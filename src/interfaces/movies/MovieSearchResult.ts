export interface MovieSearchResult {
  id: string;
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
  // other data we don't care about
}