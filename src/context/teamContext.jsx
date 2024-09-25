import { createContext, useState, useEffect } from 'react'
import { teamBaseUrl, imageUrl } from '../Constant/url'
import axios from 'axios'


export const CrudTeamContext = createContext()

export const CrudProvider = ({ children }) => {
  const [teams, setTeams] = useState([])

   
  // Function to fetch all Teams
  const fetchTeamData = async () => {
    try {
      // Make GET request to fetch all teams
      const response = await axios.get(`${teamBaseUrl}/getAllTeams`)
      if (response.status !== 200) {
        throw new Error('Failed to fetch teams')
      }

      

      // Extract data from response
      const teams = response.data

      // Optionally transform data logic
      const transformedTeams = teams.map((team) => ({
        ...teams,
        image: team.image ? `${imageUrl}/${team.image}` : null,
        //createdAt: new Date(team.createdAt).toLocaleString(),
        monthYear: new Date(team.createdAt).toLocaleString('default', { month: 'short' }) + ' ' + new Date(team.createdAt).getFullYear(),
      }))
  

      return response.data
    } catch (error) {
      console.error('Error fetching teams:', error)
      throw error // Rethrow the error to handle it where the function is called
    }
  }

   
  const contextValue = {
     
    teams,
    fetchTeamData,
    
  }

  return <CrudTeamContext.Provider value={contextValue}>{children}</CrudTeamContext.Provider>
}
