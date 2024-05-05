import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage/LandingPage";
import SideBar from "./components/SideBar/SideBar";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="main_div">
        <Header />
        <SideBar />
        <LandingPage />
      </div>
    </Provider>
  );
}

export default App;
