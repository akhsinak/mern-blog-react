// import { useLocation } from "react-router";

import "./home.css";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Homepage() {

  const location = useLocation();
  const searchf = (location.search);

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const res = await axios.get("/posts" + searchf);
      console.log(res);
      setPosts(res.data);
    }
    fetchPosts();
    
  }, [searchf]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
