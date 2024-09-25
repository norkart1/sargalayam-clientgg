import { createContext, useState, useEffect } from "react";
import { teamBaseUrl, imageUrl } from "../Constant/url";
import axios from "axios";

export const CrudTeamContext = createContext();

export const CrudProvider = ({ children }) => {
  // Function to fetch all Teams
  const fetchTeamData = async () => {
    try {
      // Make GET request to fetch all teams
      const response = await axios.get(`${teamBaseUrl}/getAllTeams`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch teams");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  const getTeamById = async (id) => {
    try {
      // Make GET request to fetch all teams
      const response = await axios.get(`${teamBaseUrl}/getTeamById/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch teams");
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  const contextValue = {
    getTeamById,
    fetchTeamData,
  };

  return (
    <CrudTeamContext.Provider value={contextValue}>
      {children}
    </CrudTeamContext.Provider>
  );
};
