import { useState, useContext, useEffect } from "react";
import "./newlist.css"
import { ListContext } from "../../context/listContext/listContext";
import { createList } from "../../context/listContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";
const NewList = () => {
  const { dispatch } = useContext(ListContext);
  const history = useHistory();
  const { movies, dispatch: movieDispatch } = useContext(MovieContext);
  useEffect(() => {
    getMovies(movieDispatch);
  }, [movieDispatch])
  const [list, setlist] = useState({
    title: "",
    type: "movie",
    genre: "",
    content: []
  });
  const handleChange = (e) => {
    e.preventDefault();
    setlist((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleCreate = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists")
  }

  const handleSelect = (e) => {
    e.preventDefault()
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setlist((prev) => ({ ...prev, [e.target.name]: value }))
  }
  console.log(list)

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" name="title" placeholder="Best Action Movies" value={list.title} onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label htmlFor="type">Type</label>
            <select name="type" id="type" value={list.type} onChange={handleChange}>
              <option value={'movie'}>Movie</option>
              <option value={'series'}>Series</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="Comedy" name="genre" value={list.genre} onChange={handleChange} />
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label htmlFor="content">Content</label>
            <select multiple name="content" id="content" onChange={handleSelect} value={list.content} style={{ height: '280px' }}>
              {movies.map((movie) => {
                return <option value={movie._id} key={movie._id}>{movie.title}</option>
              })}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleCreate}>Create</button>
      </form>
    </div>
  )
}

export default NewList