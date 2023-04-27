import { Link, useHistory } from "react-router-dom";
import "./listEdit.css";
import { useLocation, Redirect } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { ListContext } from "../../context/listContext/listContext";
import { updateList } from "../../context/listContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { useEffect } from "react";

const ListEdit = () => {
const history = useHistory()
    const { dispatch } = useContext(ListContext);
    const { movies, dispatch: movieDispatch } = useContext(MovieContext);
    useEffect(() => {
        getMovies(movieDispatch);
    }, [movieDispatch])
    const { list } = useLocation();
    const [listUpdate, setlistUpdate] = useState({
        ...list
    })

    if (!list || !list.title) {
        return <Redirect to='/lists' />
    }
    const handleChange = (e) => {
        e.preventDefault();
        setlistUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateList(listUpdate, dispatch);
        history.push('/lists')
    }
    const handleSelect = (e) => {
        e.preventDefault()
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setlistUpdate((prev) => ({ ...prev, [e.target.name]: value }))
    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newlist">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <div className="productName">{list.title}</div>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Title</label>
                        <input type="text" placeholder={list.title} name="title" value={listUpdate.title} onChange={handleChange} />
                        <label>Type</label>
                        <input type="text" placeholder={list.type} name="type" value={listUpdate.type} onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={list.genre} name="genre" value={listUpdate.genre} onChange={handleChange} />
                        <label htmlFor="content">Content</label>
                        <select multiple value={listUpdate.content} name="content" id="content" onChange={handleSelect} style={{ height: '280px' }}>
                            {movies.map((movie) => {
                                return <option value={movie._id} key={movie._id}>{movie.title}</option>
                            })}
                        </select>
                    </div>
                    <div className="productFormRight">
                        <button className="productButton" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ListEdit