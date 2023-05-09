import { APIError } from "@/interfaces/api-client/Error";
import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { IMovieApiClient } from "@/interfaces/movies/IMovieApiClient";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import { ImageType } from "@/interfaces/movies/ImageType";
import { MovieSearchResponse } from "@/interfaces/movies/MovieSearchResponse";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MoviesApiConfiguration } from "@/interfaces/movies/MoviesApiConfiguration";
import ApiClient from "@/utils/api-client/apiClient";
import { Result, err, ok } from "neverthrow";

export class MovieApiClient implements IMovieApiClient {
  private apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  private apiBaseUrl = "https://api.themoviedb.org";
  private apiVersion = 3;
  private apiResultsLanguage = "en-US";
  private movieApiClient: IApiClient = new ApiClient({});
  private moviesApiConfiguration: MoviesApiConfiguration | null = null;

  private async getMoviesApiConfiguration(): Promise<
    Result<MoviesApiConfiguration, APIError>
  > {
    const result = await this.movieApiClient.get<MoviesApiConfiguration>(
      `${this.apiBaseUrl}/${this.apiVersion}/configuration?api_key=${this.apiKey}`
    );

    if (result.isErr()) {
      console.error(`Failed to get movies API configuration`, {
        error: result.error,
      });
      return err(result.error);
    }

    return ok(result.value);
  }

  private async setMoviesApiConfiguration(): Promise<
    Result<MoviesApiConfiguration, APIError>
  > {
    if (this.moviesApiConfiguration) return ok(this.moviesApiConfiguration);

    const configuration = await this.getMoviesApiConfiguration();

    if (configuration.isErr()) {
      return err(configuration.error);
    }

    this.moviesApiConfiguration = configuration.value;
    return ok(this.moviesApiConfiguration);
  }

  async searchMovies(
    query: string,
    config: { withImages: boolean; imageSize: ImageSize } = {
      withImages: false,
      imageSize: ImageSize.sm,
    }
  ): Promise<Result<MovieSearchResult[], APIError>> {
    const result = await this.movieApiClient.get<MovieSearchResponse>(
      `${this.apiBaseUrl}/${this.apiVersion}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.apiResultsLanguage}&page=1`
    );

    if (result.isErr()) {
      console.error(`Failed to search for movies with query: ${query}`, {
        error: result.error,
      });
      return err(result.error);
    }

    let movies = result.value.results;

    if (config.withImages) {
      // Filter out movies without images
      movies = this.filterOutMoviesWithoutImage(movies);

      // Get complete paths for movies images
      const moviesWithCompleteImagesPaths = await this.mapCompleteImagePaths(
        movies,
        config.imageSize
      );
      if (moviesWithCompleteImagesPaths.isOk()) {
        movies = moviesWithCompleteImagesPaths.value;
      }
    }

    return ok(movies);
  }

  private filterOutMoviesWithoutImage(
    movies: MovieSearchResult[]
  ): MovieSearchResult[] {
    const moviesWithImages = movies.filter(
      (movie) => movie.backdrop_path && movie.poster_path
    );

    return moviesWithImages;
  }

  private async mapCompleteImagePaths(
    movies: MovieSearchResult[],
    imageSize: ImageSize
  ): Promise<Result<MovieSearchResult[], APIError>> {
    const configuration = await this.setMoviesApiConfiguration();

    if (configuration.isErr()) {
      return err(configuration.error);
    }

    const { secure_base_url, backdrop_sizes, poster_sizes } =
      configuration.value.images;

    // If passed image size > largest available size from the API, get the largest size
    let backdropSize = imageSize;
    let posterSize = imageSize;
    if (imageSize > backdrop_sizes.length - 1) {
      backdropSize = backdrop_sizes.length - 1;
    }
    if (imageSize > poster_sizes.length - 1) {
      posterSize = poster_sizes.length - 1;
    }

    // Let's go
    const updatedMovies: MovieSearchResult[] = [];

    for (const movie of movies) {
      if (movie.backdrop_path) {
        movie.complete_backdrop_path = `${secure_base_url}${backdrop_sizes[backdropSize]}${movie.backdrop_path}`;
      }
      if (movie.poster_path) {
        movie.complete_poster_path = `${secure_base_url}${poster_sizes[posterSize]}${movie.poster_path}`;
      }
      updatedMovies.push(movie);
    }

    return ok(updatedMovies);
  }
}