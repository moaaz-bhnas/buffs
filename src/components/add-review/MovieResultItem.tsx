import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { DateTime } from "luxon";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  movie: MovieSearchResult;
  setSelectedSearchResult: Dispatch<SetStateAction<MovieSearchResult | null>>;
};

function MovieResultItem({ movie, setSelectedSearchResult }: Props) {
  return (
    <div className="space-y-1">
      <button
        className="flex w-full transition-all hover:ring-4 hover:ring-teal-400"
        type="button"
        onClick={() => setSelectedSearchResult(movie)}
      >
        <Image
          className="aspect-[185/278] w-full animate-load rounded-sm bg-gray-300"
          src={
            movie.complete_poster_path ||
            "images/placeholders/backdrop-placeholder.svg"
          }
          alt={`Select ${movie.title}`}
          width={0}
          height={0}
          sizes="200px"
        />
      </button>

      <p className="text-sm">
        {movie.title} ({DateTime.fromISO(movie.release_date).year})
      </p>
    </div>
  );
}

export default MovieResultItem;