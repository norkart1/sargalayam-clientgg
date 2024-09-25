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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { CrudTeamContext } from "../context/teamContext";

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

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      const fetchedData = await fetchTeamData();
      setAllPrograms(fetchedData);
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchData();
  }, [fetchTeamData]);

  return (
    <div className="container mt-5 mb-5">
      {loading ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Total Score</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPrograms.map((row) => (
                <StyledTableRow key={row._id}>
                  <Link to={`/details/${row._id}`}>
                    <StyledTableCell
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {row._id}
                    </StyledTableCell>
                  </Link>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.totalScore}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
