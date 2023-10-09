import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function TopBar() {

    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    // const PF = "http://localhost:4000/images/"

    return (
        <div className="top">
            <div className="topleft">
                <i className="topIcon fa-brands fa-square-facebook"></i>
                <i className="topIcon fa-brands fa-square-x-twitter"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
                <i className="topIcon fa-brands fa-reddit"></i>
                <i className="topIcon fa-brands fa-discord"></i>
                <i className="topIcon fa-brands fa-square-snapchat"></i>

            </div>
            <div className="topcenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">
                            HOME
                        </Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">
                            ABOUT
                        </Link>
                    </li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">
                        <Link to="/write" className="link">
                            WRITE
                        </Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li>

                </ul>
            </div>
            <div className="topright">
                <Link to="/settings" className="link">
                    {user ? (
                        < img className="profileIcon" src={user.profilepic} alt="" />
                    )
                        : (
                            <ul className="topList">
                                <li className="topListItem">

                                    <Link to="/login" className="link">
                                        LOGIN
                                    </Link>
                                </li>

                                <li className="topListItem">

                                    <Link to="/register" className="link">
                                        REGISTER
                                    </Link>
                                </li>
                            </ul>
                        )}

                </Link>
                <i className="searchicon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}
