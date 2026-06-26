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
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
      </div>
    </div>
  );
}
