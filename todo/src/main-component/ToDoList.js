import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Create from "../MiddeleWare/Create";

const theme = createTheme({
  palette: {
    primary: {
      main: "#704264", // Primary color
    },
    secondary: {
      main: "#28A745", // Secondary color
    },
    error: {
      main: "#DC3545", // Error color
    },
    background: {
      default: "#f4f4f4", // Background color
    },
    text: {
      primary: "#000000", // Primary text color
      secondary: "#ffffff", // Secondary text color
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: "20px",
    },
  },
});

function ToDoList() {
  const [allToDoData, setAllToDoData] = useState(
    JSON.parse(localStorage.getItem("allToDo")) || []
  );

  // console.log(allToDoData);

  const [filter, setFilter] = useState([]);

  const deleteTodo = (dataindex) => {
    const deletedData = allToDoData.filter(
      (data, index) => index !== dataindex
    );
    setAllToDoData(deletedData);
    setFilter(deletedData);
  };

  const onClickCompleted = (dataindex) => {
    const data = [...allToDoData];
    data[dataindex].status = !data[dataindex].status;
    setAllToDoData(data);
  };

  const onClickFilter = (e) => {
    if (e.target.name === "ALL") {
      setFilter(allToDoData);
      return;
    }
    if (e.target.name === "COMPLETED") {
      const data = allToDoData.filter((data) => data.status === true);
      setFilter(data);
      return;
    }
    if (e.target.name === "NOTCOMPLETED") {
      const data = allToDoData.filter((data) => data.status === false);
      setFilter(data);
      return;
    }
    setFilter(allToDoData);
  };

  useEffect(() => {
    const allToDo = JSON.parse(localStorage.getItem("allToDo"));
    if (!allToDo) {
      localStorage.setItem("allToDo", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("allToDo", JSON.stringify(allToDoData));
    setFilter(allToDoData);
  }, [allToDoData]);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#49243E" }}>
          TO DO LIST
        </Typography>
        <Create setAllToDoData={setAllToDoData} allToDoData={allToDoData} />
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            name="ALL"
            onClick={onClickFilter}
            variant="contained"
            color="primary"
            style={{ margin: "5px", fontWeight: "bolder" }}
          >
            ALL
          </Button>
          <Button
            name="COMPLETED"
            onClick={onClickFilter}
            variant="contained"
            color="secondary"
            style={{ margin: "5px", fontWeight: "bolder" }}
          >
            COMPLETED
          </Button>
          <Button
            name="NOTCOMPLETED"
            onClick={onClickFilter}
            variant="contained"
            color="error"
            style={{ margin: "5px", fontWeight: "bolder" }}
          >
            NOT COMPLETED
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell
                  style={{
                    color: theme.palette.text.secondary,
                    fontWeight: "bolder",
                  }}
                >
                  Title
                </TableCell>
                <TableCell
                  style={{
                    color: theme.palette.text.secondary,
                    fontWeight: "bolder",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  style={{
                    color: theme.palette.text.secondary,
                    fontWeight: "bolder",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter.length !== 0 ? (
                filter.map((data, index) => (
                  <TableRow key={index} style={{ backgroundColor: "#BB8493" }}>
                    <TableCell style={{ color: theme.palette.text.primary }}>
                      {data.title}
                    </TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>
                      {data.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => onClickCompleted(index)}
                        variant="contained"
                        color={data.status ? "secondary" : "error"}
                        style={{
                          marginRight: "10px",
                          fontWeight: "bolder",
                          maxWidth: "100px",
                          marginBottom: "10px",
                        }}
                      >
                        {data.status ? "Done" : "Not Done"}
                      </Button>
                      <Button
                        onClick={() => deleteTodo(index)}
                        variant="contained"
                        color="error"
                        style={{
                          fontWeight: "bolder",
                          maxWidth: "100px",
                          marginBottom: "10px",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3" style={{ textAlign: "center" }}>
                    <Typography variant="body1">No todo found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}

export default ToDoList;
