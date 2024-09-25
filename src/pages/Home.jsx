import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Banner from "../layouts/Banner";
import { CrudTeamContext } from "../context/teamContext";
import { Link } from "react-router-dom";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home() {
  const { fetchTeamData } = React.useContext(CrudTeamContext);
  const [allPrograms, setAllPrograms] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchTeamData();
      setAllPrograms(fetchedData);
    };
    fetchData();
  }, [fetchTeamData]);

  return (
    <div className="container mt-5 mb-5">
      {/* <Banner /> */}
      {allPrograms && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>

                <StyledTableCell>TotalScore</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPrograms?.map((row, index) => (
                <StyledTableRow key={index}>
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
