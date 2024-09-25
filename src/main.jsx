import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CrudProvider } from "./context/teamContext.jsx";
import {ProgramCrudProvider} from './context/programContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProgramCrudProvider>
      <CrudProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CrudProvider>    
    </ProgramCrudProvider>
  </StrictMode>
);
