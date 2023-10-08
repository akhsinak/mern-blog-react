import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {

  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);


  const PF = "https://mern-blog-api-akhsinak.vercel.app/images/";
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username, email, password
    };


    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilepic = filename;

      try {
        await axios.post("https://mern-blog-api-akhsinak.vercel.app/api/upload", data);
      } catch (err) { }
    }


    try {
      const res = await axios.put("https://mern-blog-api-akhsinak.vercel.app/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" })
    }

  };

  return (
    <div className="settings">
      <div className="settingsWrapper">

        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>

        <form className="settingsForm" onSubmit={handleSubmit}>

          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilepic}
              alt=""
            />


            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>


            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input type="text" value={username} name="name" onChange={e => setUsername(e.target.value)} />

          <label>Email</label>
          <input type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} />

          <label>Password</label>


          <input type="password" placeholder="**********" name="password" onChange={e => setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>

          {success && <span style={{ color: "green" }}>Profile has been updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
