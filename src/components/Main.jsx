import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Request";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { UserAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const Main = () => {
  // Movie & MovieID States
  const [headerMovie, setHeaderMovie] = useState([]);
  const [movieIndex, setMovieIndex] = useState(fetchMovieID());
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const [, setSaved] = useState(false);

  const movieID = doc(db, "users", `${user?.email}`);

  //Returns a Random Value betwen 0 and 20
  function fetchMovieID() {
    return Math.floor(Math.random() * 20);
  }

  // Selects a Random Movie from the array that was returned
  var displayMovie = headerMovie[movieIndex];

  // Changes to another index within the Movie Array (headerMovie)
  function changeHeaderMovie() {
    setMovieIndex(fetchMovieID());
  }

  // Makes an API call, gets the JSON array for the first 20 popular movies
  var fetchHeaderMovie = () => {
    axios.get(requests.requestPopular).then((response) => {
      setHeaderMovie(response.data.results);
      console.log(response.data.results);
    });
  };

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: displayMovie.id,
          title: displayMovie.title,
          img: displayMovie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  // Makes an API call based on the current Movie Header, retrieves its homepage, opens it in a new tab
  const fetchHeaderDetails = () => {
    let requestDetails = `https://api.themoviedb.org/3/movie/${displayMovie?.id}?api_key=${requests.requestAPI}`;
    axios.get(requestDetails).then((response) => {
      window.open(`${response.data.homepage}`, "_blank");
    });
  };

  // Fetches the Header Movies
  useEffect(() => {
    console.clear();
    fetchHeaderMovie();
  }, []);

  // Runs through the Array of Header Movies, evey 5 seconds
  useEffect(() => {
    const internalID = setInterval(() => {
      changeHeaderMovie();
    }, 10000);
    return () => clearInterval(internalID);
  });

  // Shortens String to length (num)
  const truncateString = (string, num) => {
    if (string?.length > num) {
      return string.slice(0, num);
    } else {
      return string;
    }
  };

  return (
    <div className="w-full h-[926px] text-white">
      <div className="w-full h-full animate-fade">
        <div className="absolute w-full h-[926px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-[926px] object-cover"
          src={`https://image.tmdb.org/t/p/original/${displayMovie?.backdrop_path}`}
          alt={displayMovie?.title}
        />
        <div className="absolute flex flex-col space-y-6 items-center w-full top-[30%] p-4 md:p-8">
          <h1 className="text-white text-center text-3xl md:text-5xl font-bold">
            {displayMovie?.title}
          </h1>
          <div className="my-4 flex space-x-0.5">
            <div className="flex flex-row items-center justify-center space-x-10">
              <MdChevronLeft
                onClick={changeHeaderMovie}
                className="rounded-full cursor-pointer fill-white-500 opacity-50 hover:opacity-100 transition-all"
                size={40}
              />
              {like ? (
                <FaHeart
                  onClick={saveShow}
                  className="fill-green-500 h-8 py-1 px-1 w-10 opacity-50 hover:opacity-100 transition-all cursor-pointer"
                />
              ) : (
                <FaRegHeart
                  onClick={saveShow}
                  className="fill-green-500 h-8 py-1 px-1 w-10 opacity-50 hover:opacity-100 transition-all cursor-pointer"
                />
              )}
              <MdChevronRight
                onClick={changeHeaderMovie}
                className="rounded-full cursor-pointer fill-white-500 opacity-50 hover:opacity-100 transition-all"
                size={40}
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1 ">
            <p className="text-gray-400 text-sm">
              {truncateString(displayMovie?.release_date, 4)}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 text-center">
              {truncateString(displayMovie?.overview, 150)} ...
            </p>
          </div>
          <button
            onClick={fetchHeaderDetails}
            className="border-2 rounded text-white opacity-50 hover:opacity-100 transition-all py-2 px-5 w-40"
          >
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
