import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Container,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { CrudTeamContext } from "../context/teamContext";

import './style.css'
import Pagination from "./pagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const { fetchTeamData } = React.useContext(CrudTeamContext);
  const [allPrograms, setAllPrograms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchTeamData();

      // Sort teams based on total score in descending order
      const sortedTeams = fetchedData.sort((a, b) => b.totalScore - a.totalScore);

      // Assign ranking based on the sorted order
      const rankedTeams = sortedTeams.map((team, index) => ({
        ...team,
        ranking: index + 1, // Assign rank based on position
      }));

      setAllPrograms(rankedTeams);
      setLoading(false); // Set isLoading to false after fetching data
    };
    fetchData();
  }, [fetchTeamData]);

  const formatId = (id) => {
    if (!id) return "";
    const visiblePart = id.slice(0, 10); // Show the first 5 characters
    return `${visiblePart}************`;
  };
  

  const itemsPerPage = 6; // Change this value to control how many programs to show per page

  const totalTeams = allPrograms?.length || 0;
  const totalPages = Math.ceil(totalTeams / itemsPerPage);

  const currentTeam = allPrograms?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Results
      </Typography>
      {loading ? (
      <TableContainer component={Paper} className="responsive-table-container">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Total Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(5)).map((_, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <Skeleton variant="text" width={100} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="text" width={200} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="text" width={100} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : error ? (
      <div className="error-message">
        <p>Failed to load data: {error}</p>
      </div>
    ) : (
      <TableContainer component={Paper} className="responsive-table-container">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>Total Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTeam.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>
                  <Link to={`/details/${row._id}`}>
                    <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                      {formatId(row._id)}
                    </span>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.ranking}</StyledTableCell>
                <StyledTableCell>{row.totalScore}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

    <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
}

