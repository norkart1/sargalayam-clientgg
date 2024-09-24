import { createContext } from "react";
import { teamBaseUrl } from "../Constant/url";
import axios from "axios";

export const CrudProgramContext = createContext();

export const ProgramCrudProvider = ({ children }) => {
  // Function to fetch all programs
  const fetchPrograms = async () => {
    console.log("try to fetch");

    try {
      // Make GET request to fetch all programs
      const response = await axios.get(`${teamBaseUrl}/getAllPrograms`);

      console.log("respon", response);
      if (response.status !== 200) {
        throw new Error("Failed to fetch programs");
      }
      console.log("resposen", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  const contextValue = {
    fetchPrograms,
  };

  return (
    <CrudProgramContext.Provider value={contextValue}>
      {children}
    </CrudProgramContext.Provider>
  );
};
