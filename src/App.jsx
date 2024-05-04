import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";

function App() {
  return (
    <div className="main_div">
      <Header />
      <SideBar />
      <LandingPage />
    </div>
  );
}

export default App;
