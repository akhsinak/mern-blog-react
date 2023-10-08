import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import axios from "axios";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://mern-blog-api-akhsinak.vercel.app/api/auth/register", {
        username, email, password
      });
      console.log(res);
      res.data && window.location.replace("/login")
    }
    catch (err) {
      console.log(err);
      setError(true);
    }

  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>

        <label>Username</label>
        <input className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={e => setUsername(e.target.value)}
        // onChange={e => console.log(e)}
        />


        <label>Email</label>
        <input className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)} />


        <label>Password</label>
        <input className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}
        />

        <button className="registerButton" type="submit">Register</button>
      </form>
      <Link to="/login">
        <button className="registerLoginButton">Login</button>
      </Link>
      {error && <span>Something went Wrong</span>}
    </div>
  )
}
