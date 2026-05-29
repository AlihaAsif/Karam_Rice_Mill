import "./Topbar.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="top-left">
        📍 6Km Hujra Depalpur Road Okara, Punjab, Pakistan
        <span className="email">
          ✉ karamicemill@gmail.com
        </span>
      </div>

      <div className="top-right">
        <FaFacebookF />
        <FaInstagram />
        <FaYoutube />
      </div>
    </div>
  );
}