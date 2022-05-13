import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Inpits from "../components/Inputs";
import ModalInfo from "../components/ModalInfo";
import Tables from "../components/Table";
import "../styles/admin.css";

const AdminPage = () => {
  const [table, setTable] = useState("");
  const [producers, setProducers] = useState([]);
  const [models, setModels] = useState([]);
  const [typeEngine, setTypeEngine] = useState([])
  const [generations, setGenerations] = useState([]);
  const [inputDateFrom, setInputDateFrom] = useState("");
  const [inputDateTo, setInputDateTo] = useState("");
  const [dropdowns, setDropdowns] = useState([]);
  const [selectedDropdown, setSelectedDropdown] = useState("категория");
  const [inputName, setInputName] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputDisplacement, setInputDisplacement] = useState("");
  const [selectedProducer, setSelectedProducer] = useState("Марка");
  const [selectedModel, setSelectedModel] = useState("Модель");
  const [selectedGeneration, setSelectedGeneration] = useState("Поколение");
  const [selectedTypeEngine, setSelectedTypeEngine] = useState("Тип")
  const [modalActive, setModalActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false)


  useEffect(() => {
    const getResultCars = async () => {
      const result = await fetch("http://localhost:8080/api/v1/admin");
      const resultJSON = await result.json();
      setDropdowns(resultJSON);
    };
    getResultCars();
  }, []);

  useEffect(() => {
    const getResultCars = async () => {
      const result = await fetch("http://localhost:8080/api/v1/admin/engine");
      const resultJSON = await result.json();
      setTypeEngine(resultJSON)
    };
    getResultCars();
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
        "http://localhost:8080/api/v1/producer/" + selectedProducer
      );
      const resultJSON = await result.json();
      setModels(resultJSON);
      setSelectedModel("Модель");
    };
    getModels();
  }, [selectedProducer]);

  useEffect(() => {
    const getGenerations = async () => {
      setGenerations([]);
      const result = await fetch(
        "http://localhost:8080/api/v1/model/" + selectedModel
      );
      const resultJSON = await result.json();
      setGenerations(resultJSON);
      setSelectedGeneration("Поколение");
    };

    getGenerations();
  }, [selectedModel]);

  const renderSwitch = (table) => {
    switch (table) {
      case "engine":
        return <Inpits stl={"filter"} name="Цена до $" />;
      case "Color":
        return (
          <Inpits
            stl={"admin-input"}
            name="name of color"
            value={inputName}
            setInput={setInputName}
          />
        );
      case "Body":
        return (
          <Inpits
            stl={"admin-input"}
            name="name of body"
            value={inputName}
            setInput={setInputName}
          />
        );
      case "Transission":
        return (
          <Inpits
            stl={"admin-input"}
            name="type of transmisson"
            value={inputType}
            setInput={setInputType}
          />
        );
      case "Drive":
        return (
          <Inpits
            stl={"admin-input"}
            name="type of drive"
            value={inputType}
            setInput={setInputType}
          />
        );
      case "Engine":
        return (
          <div className="admin-bar">
             <Dropdown
              selected={selectedTypeEngine}
              setSelected={setSelectedTypeEngine}
              values={typeEngine}
            />
            <Inpits
              stl={"admin-input"}
              name="displacement"
              value={inputDisplacement}
              setInput={setInputDisplacement}
            />
          </div>
        );
      case "Producer":
        return (
          <div className="admin-bar">
            <Dropdown
              selected={selectedProducer}
              setSelected={setSelectedProducer}
              values={producers}
            />
            {selectedProducer === "Марка" && (
              <Inpits
                stl={"admin-input"}
                name="new name of producer"
                value={inputName}
                setInput={setInputName}
              />
            )}

            {selectedProducer !== "Марка" && (
              <div className="admin-bar">
                {" "}
                <Dropdown
                  selected={selectedModel}
                  setSelected={setSelectedModel}
                  values={models}
                />
                {selectedModel === "Модель" && (
                  <div className="admin-bar">
                    <Inpits
                      stl={"admin-input"}
                      name="new name of Model"
                      value={inputName}
                      setInput={setInputName}
                    />
                  </div>
                )}
                {selectedModel !== "Модель" && (
                  <div className="admin-bar">
                    {" "}
                    <Inpits
                      stl={"admin-input"}
                      name="new name of generation"
                      value={inputName}
                      setInput={setInputName}
                    />
                    <Inpits
                      stl={"admin-input"}
                      name="date from (generation)"
                      value={inputDateFrom}
                      setInput={setInputDateFrom}
                    />
                    <Inpits
                      stl={"admin-input"}
                      name="date to (generation)"
                      value={inputDateTo}
                      setInput={setInputDateTo}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      default:
        return "";
    }
  };

  const sendOn = async () => {
    const sendData = sendOnBack();
    let result = await fetch("http://localhost:8080/api/v1/admin/add", {
      method: "POST",
      headers: {
        Accept: "applications/json,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    if (result.ok) {
      setModalActive(true);
    }
    setIsClicked(!isClicked);
  };

  const sendOnBack = () => {
    switch (selectedDropdown) {
      case "Engine":
        return {
          fieldName: selectedDropdown,
          type: inputType,
          displacement: inputDisplacement,
        };
      case "Color":
        return {
          fieldName: selectedDropdown,
          name: inputName,
        };

      case "Body":
        return {
          fieldName: selectedDropdown,
          name: inputName,
        };
      case "Drive":
        return {
          fieldName: selectedDropdown,
          type: inputType,
        };
      case "Producer": {
        if (selectedProducer !== "Марка" && selectedModel === "Модель") {
          return {
            fieldName: "Model",
            name: inputName,
            foreignId: producers.filter((model) => {
              return model.name == selectedProducer;
            })[0].id,
          };
        } else if (selectedModel !== "Модель") {
          return {
            fieldName: "Generation",
            name: inputName,
            foreignId: models.filter((generation) => {
              return generation.name == selectedModel;
            })[0].id,
            startOfProduction: inputDateFrom,
            endOfProduction: inputDateTo,
          };
        } else {
          return {
            fieldName: selectedDropdown,
            name: inputName,
          };
        }
      }
      default:
        return "";
    }
  };

  return (
    <Container>
      <Header />
      <hr />
      <div className="admin-bar">
        <Dropdown
          selected={selectedDropdown}
          setSelected={setSelectedDropdown}
          values={dropdowns}
        />
        {renderSwitch(selectedDropdown)}

        <Button stl={"filter"} text="ADD" onClick={sendOn}  />
      </div>
      <ModalInfo
        active={modalActive}
        setActive={setModalActive}
        info={"Данные добавлены в базу данных"}
      ></ModalInfo>
      <hr />
      <Tables
       selectedDropdown={selectedDropdown}
       selectedProd={selectedProducer}
       selectedMod={selectedModel}
       selectedGener = {selectedGeneration}
       isClicked={isClicked}
      />
    </Container>
  );
};

export default AdminPage;
