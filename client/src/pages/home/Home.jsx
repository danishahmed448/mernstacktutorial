import { AcUnit } from "@material-ui/icons";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useSearch } from "../../searchContext/SearchContext";
import { axiosInstance } from "../../axiosInstance/axiosInstance";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const {suggestions, setSuggestions,query,setQuery} = useSearch();
  
  useEffect(() => {

    const getRandomLists = async () => {
      try {
        const res = await axiosInstance.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
          },

        });

        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomLists();

  }, [type, genre])
  
console.log(suggestions)
  return (

    <div className='home'>
      <Navbar setSuggestions={setSuggestions} query={query} setQuery={setQuery} setGenre={setGenre}/>
      {(query?.length>0) ? (
        <div className="searchPage">
            <List list={{
              title:`${suggestions?.length>0 ? "" : "No "}Search results`,
              content:[...suggestions],
            }} search />
        </div>
      ) : (
        <>
          {lists.length > 0 ? <Featured type={type} setGenre={setGenre} /> : <></>}
          {lists?.map((list, i) => <List key={i} list={list} />)}
        </>
      )}

    </div>
  )
}

export default Home