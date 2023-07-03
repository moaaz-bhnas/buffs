import { DBMovie } from "./DBMovie";

export interface Review {
  username: string;
  userDetails: {
    displayName: string;
    avatar: string;
  };
  movieDetails: DBMovie;
  rating: number;
  review: string;
  /**
   * Array of usernames who liked the review
   */
  likers: string[];
  /**
   * Array of usernames who saved the review
   */
  savers: string[];
  /**
   * Array of usernames who shared the review
   */
  sharers: string[];
  /**
   * TODO: needs to be updated with the comment schema
   */
  comments: any[];
}
