import { useEffect, useState } from "react"
import "./sidebar.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [cat, setCat] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get("/categories");
            console.log(res.data);
            setCat(res.data);
        }
        getCat();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle"
                >ABOUT ME</span>
                <img className="sidebarimg" src="/images/apollo.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas distinctio modi molestias iusto facilis eligendi reprehenderit totam, consequatur laborum. Delectus corporis itaque rem repellat aspernatur blanditiis distinctio voluptates totam nulla!</p>

            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle"
                >CATEGORIES</span>
                <div className="sidebarList">
                    {cat?.map((c) => (
                        <div className="sidebarListItem">
                            <Link to={`/?cat=${c.name}`} className="link">
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="topleft">
                    <i className="topIcon fa-brands fa-square-facebook"></i>
                    <i className="topIcon fa-brands fa-square-x-twitter"></i>
                    <i className="topIcon fa-brands fa-square-instagram"></i>
                    <i className="topIcon fa-brands fa-reddit"></i>
                    <i className="topIcon fa-brands fa-discord"></i>
                    <i className="topIcon fa-brands fa-square-snapchat"></i>

                </div>
            </div>
        </div>
    )
}
