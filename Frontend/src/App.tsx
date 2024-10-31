import { useContext, useState } from "react";
import "./App.css";
import Result from "./components/feature/result/Result";
import SearchBar from "./components/reusables/input/SearchBar";
import getDomainInfo from "./services/getDomainInfo";

import LoadingSpinner from "./components/reusables/spinner/LoadingSpinner";
import NavBar from "./components/feature/nav/NavBar";
import InfoContext from "./store/InfoContext";

function App() {
    // using loading feature here will cause the whole app to re-render
    // but since the app is small, it's fine here.
    // use here and pass as props to SearchBar to make SearchBar more reusable.
    const [isLoading, setIsLoading] = useState(false);

    // hook for making the request.
    // use here and pass as props to SearchBar to make SearchBar more reusable.
    const getDomainInfoRequest = getDomainInfo();

    // hook for context/store
    // use here and pass as props to SearchBar to make SearchBar more reusable.
    const { handleStateUpdate } = useContext(InfoContext);

    if (!import.meta.env.VITE_LOCALHOST_PORT) {
        return "Please make sure that you have your .env file and the VITE_LOCALHOST_PORT value is correct.";
    }

    return (
        <div id="container">
            {isLoading && <LoadingSpinner />}
            <NavBar />
            <section id="main">
                <SearchBar
                    placeHolder={"Search Domain..."}
                    requestFunction={getDomainInfoRequest}
                    storeFunction={handleStateUpdate}
                    setIsLoading={setIsLoading}
                />
                <Result />
            </section>
        </div>
    );
}

export default App;
