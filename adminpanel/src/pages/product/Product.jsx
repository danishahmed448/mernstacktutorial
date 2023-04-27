import { Link } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { useLocation, Redirect } from "react-router-dom";
import { useState } from "react";
import { storage } from '../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";


const Product = () => {
    const { dispatch } = useContext(MovieContext);
    const { movie } = useLocation();
    const [movieUpdate, setmovieUpdate] = useState({
        ...movie
    })

    if (!movie || !movie.title) {
        return <Redirect to='/movies' />
    }
    const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const label = e.target.name;
        const item = { file: file, label: label };
        const storageRef = ref(storage, uuidv4() + '_' + item.file.name);
        const uploadTask = uploadBytesResumable(storageRef, item.file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //   case 'paused':
            //     console.log('Upload is paused');
            //     break;
            //   case 'running':
            //     console.log('Upload is running');
            //     break;
            // }
        }, (error) => { console.log(error) }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setmovieUpdate((prev) => ({ ...prev, [item.label]: downloadURL }))
            })
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setmovieUpdate((prev) => ({ ...prev, [e.target.name]: e.target.value }))


    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(movieUpdate, dispatch);
    }
    console.log(movieUpdate)
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                {/* <div className="productTopLeft">
                    <Chart data={productData} dataKey={'Sales'} title={'Sales Performance'} />
                </div> */}
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.img} alt="product_name" className="productInfoImg" />
                        <div className="productName">{movie.title}</div>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">{movie.limit}+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" placeholder={movie.title} name="title" value={movieUpdate.title} onChange={handleChange} />
                        <label>Description</label>
                        <textarea type="text" placeholder={movie.desc} rows="6" name="desc" value={movieUpdate.desc} onChange={handleChange} />
                        <label>Year</label>
                        <input type="text" placeholder={movie.year} name="year" value={movieUpdate.year} onChange={handleChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={movie.genre} name="genre" value={movieUpdate.genre} onChange={handleChange} />
                        <label>Video</label>
                        <input type="file" name="video" onChange={handleUpload} />
                        <label>Trailer</label>
                        <input type="file" name="trailer" onChange={handleUpload} />
                        <label>Limit</label>
                        <input type="text" placeholder={movie.limit} name="limit" value={movieUpdate.limit} onChange={handleChange} />
                        <label>Duration</label>
                        <input type="text" placeholder={movie.duration} name="duration" value={movieUpdate.duration} onChange={handleChange} />
                        {/* <select name="inStock" id="inStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select> */}
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <label htmlFor="posterImg">Poster</label>
                            <img src={movie.img} alt="" className="productUploadImg" id="posterImg" />
                            <label htmlFor="fileOne">
                                <Publish />
                            </label>
                            <input type="file" id="fileOne" style={{ display: "none" }} name="img" onChange={handleUpload} />
                        </div>
                        <div className="productUpload">
                            <label htmlFor="showcaseImg">Showcase</label>
                            <img src={movie.imgSm} alt="" id="showcaseImg" className="productUploadImg" />
                            <label htmlFor="fileTwo">
                                <Publish />
                            </label>
                            <input type="file" id="fileTwo" style={{ display: "none" }} name="imgSm" onChange={handleUpload} />
                        </div>
                        <div className="productUpload">
                            <label htmlFor="titleImg">Title</label>
                            <img src={movie.imgTitle} alt="" id="titleImg" className="productUploadImg" />
                            <label htmlFor="fileThree">
                                <Publish />
                            </label>
                            <input type="file" id="fileThree" style={{ display: "none" }} name="imgTitle" onChange={handleUpload} />
                        </div>
                        <button className="productButton" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product