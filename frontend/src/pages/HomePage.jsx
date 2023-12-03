import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col bg-dark-3">
      <NavBar className=""></NavBar>
      <div className="flex-1"></div>
      <Footer className=""></Footer>
    </div>
  );
}
