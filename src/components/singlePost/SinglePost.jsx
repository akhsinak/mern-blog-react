import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {

  const { user } = useContext(Context);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      // console.log(res); 
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  }, [path])

  const PF = "https://mern-blog-api-akhsinak.vercel.app/images/"

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, { data: { username: user.username } });
      window.location.replace("/")
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, { username: user.username, title, desc });
      setUpdateMode(false)
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={PF + post.photo}
          alt=""
        />


        <h1 className="singlePostTitle">
          {updateMode ? <input type="text" value={title}
            className="titleUpdate"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
            : `${title}`}

          {(post.username === user?.username) &&
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(updateMode ^ 1)}></i>
              <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
            </div>
          }

        </h1>


        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {
          updateMode ? <textarea
            value={desc}
            className="descUpdate"
            onChange={(e) => setDesc(e.target.value)}
          />
            :
            <p className="singlePostDesc">
              {desc}
            </p>
        }
        {updateMode ? <button className="updateButton" onClick={handleUpdate}>Update</button> : <></>}


      </div >
    </div >
  );
}
