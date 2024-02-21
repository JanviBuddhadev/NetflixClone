import {API_OPTIONS} from "../Utils/constants"
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../Utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch=useDispatch();
    const getNowPlayingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const jsondata = await data.json();
      dispatch(addNowPlayingMovies(jsondata.results));
      console.log("Movies now playing data", jsondata.results);
    };
  
    useEffect(()=>{
      getNowPlayingMovies();
    },[]);
}
export default useNowPlayingMovies;

