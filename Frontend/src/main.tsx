import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import InfoContextProvider from "./store/InfoProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <InfoContextProvider>
            <App />
        </InfoContextProvider>
    </StrictMode>
);
