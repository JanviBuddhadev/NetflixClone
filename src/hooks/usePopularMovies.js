import React from 'react'
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../Utils/moviesSlice';
import { API_OPTIONS } from '../Utils/constants';
import { useEffect } from 'react';

const usePopularMovies = () => {
    const dispatch=useDispatch();
    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      const jsondata = await data.json();
      dispatch(addPopularMovies(jsondata.results));
      console.log("Movies Popular data", jsondata.results);
    };
  
    useEffect(()=>{
        getPopularMovies();
    },[]);
}

export default usePopularMovies