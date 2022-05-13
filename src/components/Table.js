import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const Tables = ({
  selectedDropdown,
  selectedProd,
  selectedMod,
  selectedGener,
}) => {
  const [producers, setProducers] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [year, setYear] = useState([]);
  const [body, setBody] = useState([]);
  const [color, setColor] = useState([]);
  const [drive, setDrive] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [engine, setEngine] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch("http://localhost:8080/api/v1/drive/all");
      const resultJSON = await result.json();
      setDrive(resultJSON);
    };
    getResult();
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch("http://localhost:8080/api/v1/engine/all");
      const resultJSON = await result.json();
      setEngine(resultJSON);
    };
    getResult();
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch("http://localhost:8080/api/v1/color/all");
      const resultJSON = await result.json();
      setColor(resultJSON);
    };
    getResult();
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch("http://localhost:8080/api/v1/body/all");
      const resultJSON = await result.json();
      setBody(resultJSON);
    };
    getResult();
  }, []);

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch("http://localhost:8080/api/v1/producer/all");
      const resultJSON = await result.json();
      setProducers(resultJSON);
    };
    getResult();
  }, []);

  useEffect(() => {
    const getModels = async () => {
      setModels([]);
      const result = await fetch(
        "http://localhost:8080/api/v1/producer/" + selectedProd
      );
      const resultJSON = await result.json();
      setModels(resultJSON);
      //setSelectedModel("Модель");
    };
    getModels();
  }, [selectedProd]);

  useEffect(() => {
    const getGenerations = async () => {
      setGenerations([]);
      const result = await fetch(
        "http://localhost:8080/api/v1/model/" + selectedMod
      );
      const resultJSON = await result.json();
      setGenerations(resultJSON);
      // setSelectedGeneration("Поколение");
    };

    getGenerations();
  }, [selectedMod]);

  useEffect(() => {
    const getGenerations = async () => {
      setYear([]);
      const result = await fetch(
        "http://localhost:8080/api/v1/generation/years/" + selectedGener
      );
      const resultJSON = await result.json();
      setYear(resultJSON);
    };

    getGenerations();
  }, [selectedGener]);

  console.log("213123", selectedMod);

  const onTable = () => {
    console.log("aslanbek ", selectedDropdown);
    switch (selectedDropdown) {
      case "Engine":
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Displaceent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engine.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">{row.displacement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case "Color":
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="center">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {color.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case "Body":
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="center">Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {body.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      // case "Drive":
      //   return (
      //     <TableContainer component={Paper}>
      //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
      //         <TableHead>
      //           <TableRow>
      //             <TableCell>id</TableCell>
      //             <TableCell align="center">Type</TableCell>
      //           </TableRow>
      //         </TableHead>
      //         <TableBody>
      //           {drive.map((row) => (
      //             <TableRow
      //               key={row.id}
      //               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      //             >
      //               <TableCell component="th" scope="row">
      //                 {row.id}
      //               </TableCell>
      //               <TableCell align="center">{row.type}</TableCell>
      //             </TableRow>
      //           ))}
      //         </TableBody>
      //       </Table>
      //     </TableContainer>
      //   );
      case "Producer":
        return (
          <TableContainer component={Paper}>
            {selectedProd === "Марка" && (
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="center">Producer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {producers.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {selectedProd !== "Марка" && selectedMod === "Модель" && (
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="center">Model</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {models.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {selectedMod !== "Модель" && (
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="center">Generation</TableCell>
                    <TableCell align="center">startOfProduction</TableCell>
                    <TableCell align="center">endOfProduction</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generations.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.startOfProduction}</TableCell>
                      <TableCell align="center">{row.endOfProduction}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        );
      default:
        return "";
    }
  };

  return <div>{onTable()}</div>;
};

export default Tables;
