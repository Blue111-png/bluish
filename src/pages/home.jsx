import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './home.css';

export default function Home() {
  return (
<div className="home-container">
      <div className="background-carousel">
        <div className="slide slide1">
          <div className="quote">
            A soldier’s strength lies not in the roar of battle, 
            but in the silence before it—where resolve is forged, 
            and purpose becomes unshakable.
          </div>
        </div>
        <div className="slide slide2">
          <div className="quote">
            Victory isn’t claimed by strength alone—it’s earned through precision, 
            discipline, and the will to adapt when the mission shifts.
          </div>
        </div>
        <div className="slide slide3">
          <div className="quote">
            Discipline is the soul of an army. It makes small numbers formidable, 
            procures success to the weak, and esteem to all.
          </div>
        </div>
      </div>

      <div className="home-content">
        <h1>WELCOME TO BLUISH</h1>
        <h3>Login to checkout our product</h3>
        
    </div>
    </div>
  );
}