import { useState, useContext } from "react";
import "./newproduct.css"
import { storage } from '../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/apiCalls";
const NewProduct = () => {
  const { dispatch } = useContext(MovieContext);
  const [movie, setmovie] = useState({
    title: "", desc: "", year: "",
    genre: "",
    video: "",
    trailer: "",
    limit: "",
    img: "",
    imgSm: "",
    imgTitle: "",
    duration: "",
    isSeries: false
  })
  const [video, setvideo] = useState("");
  const [trailer, settrailer] = useState("");
  const [img, setimg] = useState("");
  const [imgSm, setimgSm] = useState("");
  const [imgTitle, setimgTitle] = useState("");
  const [uploaded, setuploaded] = useState(0)
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'isSeries') {
      const value = e.target.value === 'true';
      setmovie((prev) => ({ ...prev, [e.target.name]: value }))
    } else {

      setmovie((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

  }
  const upload = (items) => {

    items.forEach((item) => {
      const storageRef = ref(storage, uuidv4() + '_' + item.file.name);
      const uploadTask = uploadBytesResumable(storageRef, item.file)
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
          setmovie((prev) => ({ ...prev, [item.label]: downloadURL }))
          setuploaded((prev) => prev + 1)
        })
      })
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgSm, label: "imgSm" },
      { file: imgTitle, label: "imgTitle" },
      { file: video, label: "video" },
      { file: trailer, label: "trailer" },
    ])
  }

  const handleCreate = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    setvideo("");
    settrailer("");
    setimg("");
    setimgSm("");
    setimgTitle("");
    setmovie({
      title: "", desc: "", year: "",
      genre: "",
      video: "",
      trailer: "",
      limit: "",
      img: "",
      imgSm: "",
      imgTitle: "",
      duration: "",
      isSeries: false
    });
    setuploaded(0);
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label htmlFor="img">Poster Image</label>
          <input type="file" id="img" onChange={(e) => setimg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label htmlFor="imgTitle">Title Image</label>
          <input type="file" id="imgTitle" onChange={(e) => setimgTitle(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label htmlFor="imgSm">Showcase Image</label>
          <input type="file" id="imgSm" onChange={(e) => setimgSm(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="John Wick" value={movie.title} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea type="text" name="desc" placeholder="An ex-hit-man comes out of...." rows="4" value={movie.desc} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Comedy" name="genre" value={movie.genre} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="2023" value={movie.year} name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="16" value={movie.limit} name="limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label htmlFor="isSeries">Is Series?</label>
          <select name="isSeries" id="isSeries" value={movie.isSeries} onChange={handleChange}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label htmlFor="trailer">Trailer</label>
          <input type="file" id="trailer" onChange={(e) => settrailer(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label htmlFor="video">Video</label>
          <input type="file" id="video" onChange={(e) => setvideo(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="1 hr 16 min" value={movie.duration} name="duration" onChange={handleChange} />
        </div>
        {uploaded !== 5 ? <button className="addProductButton" onClick={handleSubmit}>Upload</button> : <button className="addProductButton" onClick={handleCreate}>Create</button>}


      </form>
    </div>
  )
}

export default NewProduct