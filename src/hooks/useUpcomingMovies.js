import React from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../Utils/constants';
import { useEffect } from 'react';
import { addUpComingMovies } from '../Utils/moviesSlice';

const useUpcomingMovies = () => {
    const dispatch=useDispatch();
    const getUpcomingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );
      const jsondata = await data.json();
      dispatch(addUpComingMovies(jsondata.results));
      console.log("Movies Top Rated data", jsondata.results);
    };
  
    useEffect(()=>{
        getUpcomingMovies();
    },[]);
}

export default useUpcomingMovies