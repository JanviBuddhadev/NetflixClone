import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constants";
import { addTopRatedMovies } from "../Utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch=useDispatch();
    const getTopRatedMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );
      const jsondata = await data.json();
      dispatch(addTopRatedMovies(jsondata.results));
      console.log("Movies Top Rated data", jsondata.results);
    };
  
    useEffect(()=>{
        getTopRatedMovies();
    },[]);
}

export default useTopRatedMovies