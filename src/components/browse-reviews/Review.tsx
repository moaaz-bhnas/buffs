"use client";

import { DBReview } from "@/interfaces/database/DBReview";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";
import { StarIcon } from "@heroicons/react/24/outline";
import MDEditor from "@uiw/react-md-editor";
import {
  EllipsisHorizontalIcon,
  BookmarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Popover } from "@headlessui/react";

type Props = {
  review: DBReview;
  currentViewer: string;
};

function Review({ review, currentViewer }: Props) {
  return (
    <li role="article" className="space-y-2 border-b py-3 first:pt-0">
      {/* username and avatar */}
      <header className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <Link href={`/${review.username}`}>
            <Avatar size={32} avatarUrl={review.userDetails.avatar} />
          </Link>
          <Link href={`/${review.username}`} className="font-semibold">
            {review.userDetails.displayName}
          </Link>
        </div>
        <time
          className="text-sm text-gray-600"
          dateTime={review.createdAt}
          suppressHydrationWarning={true}>
          {DateTime.fromISO(review.createdAt).toRelative()}
        </time>

        <Popover className="relative ml-auto outline-none">
          <Popover.Button>
            <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer outline-none" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 right-0 bg-white w-40">
            <ul className="gap-3 shadow-md rounded-md justify-between ">
              <li
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 w-full
              p-1 duration-200 ease-linear">
                <BookmarkIcon className="w-4 h-4" />
                <span className="font-medium text-base">save</span>
              </li>
              {review.username === currentViewer ? (
                <>
                  <hr />
                  <li
                    className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 w-full
              p-1 duration-200 ease-linear">
                    <PencilIcon className="w-4 h-4" />
                    <span className="font-medium text-base">Edit</span>
                  </li>
                  <hr />
                  <li
                    className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 w-full
              p-1 duration-200 ease-linear">
                    <TrashIcon className="w-4 h-4" />
                    <span className="font-medium text-base">remove</span>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            <img src="/solutions.jpg" alt="" />
          </Popover.Panel>
        </Popover>
      </header>

      {/* movie details */}
      <div className="flex gap-x-2">
        <Image
          className="w-32 shrink-0 rounded-sm"
          src={review.movieDetails.posterPath}
          alt={""}
          width={0}
          height={0}
          sizes="10rem"
        />

        <div className="space-y-1">
          <p className="text-base leading-6">
            {review.movieDetails.title} (
            {DateTime.fromISO(review.movieDetails.releaseDate).year})
          </p>
          <p className="text-sm text-gray-600">
            {review.movieDetails.genres.join(", ")}
          </p>
        </div>
      </div>

      {/* Review Details */}
      <div>
        <p className="inline-flex items-center gap-x-1.5 rounded-full bg-teal-100 px-2 py-1">
          <StarIcon className="w-4 fill-yellow-600 stroke-none" />
          <span className="text-base font-semibold">{review.rating}</span>
        </p>
        <MDEditor.Markdown source={review.review} />
      </div>
    </li>
  );
}

export default Review;
