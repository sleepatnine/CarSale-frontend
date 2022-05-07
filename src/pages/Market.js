import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import AutoCard from "../components/AutoCard";
import Container from "../components/Container";
import Header from "../components/Header";
import "./../styles/market.css";
import Inpits from "../components/Inputs";

const Market = () => {
  const [producers, setProducers] = useState([]);
  const [cars, setCars] = useState([]);
  const [filterCars, setFilterCars] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [showAllModels, setShowAllModels] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState("Марка");
  const [selectedModel, setSelectedModel] = useState("Модель");
  const [selectedGeneration, setSelectedGeneration] = useState("Поколение");
  const [inputPriceFrom, setInputPriceFrom] = useState("");
  const [inputPriceTo, setInputPriceTo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sizeEngineFrom, setSizeEngineFrom] = useState("");
  const [sizeEngineTo, setSizeEngineTo] = useState("");

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

  const onShowAllModels = () => {
    setShowAllModels(true);
  };

  useEffect(() => {
    const getResultCars = async () => {
      const result = await fetch("http://localhost:8080/api/v1/car-ad");
      const resultJSON = await result.json();
      setCars(resultJSON);
    };
    getResultCars();
  }, []);

  const onChoseMark = (producer) => {
    setSelectedProducer(producer);
    const getResultCars = async () => {
      const result = await fetch(
        "http://localhost:8080/api/v1/car-ad/producer/" + producer
      );
      const resultJSON = await result.json();
      setCars(resultJSON);
    };
    getResultCars();
    onFilter();
  };

  const handleClear = () => {
    setInputPriceFrom("");
  };

  const onFilter = () => {
    let filtredCars = cars;

    if (selectedProducer !== "Марка") {
      filtredCars = filtredCars.filter(
        (car) => car.generation.model.producer.name == selectedProducer
      );
    }
    if (selectedModel !== "Модель") {
      filtredCars = filtredCars.filter(
        (car) => car.generation.model.name == selectedModel
      );
    }
    if (selectedGeneration !== "Поколение")
      filtredCars = filtredCars.filter(
        (car) => car.generation.name == selectedGeneration
      );

    if (inputPriceFrom !== "") {
      filtredCars = filtredCars.filter((car) => car.price >= inputPriceFrom);
    }
    if (inputPriceTo !== "") {
      filtredCars = filtredCars.filter((car) => car.price <= inputPriceTo);
    }
    if (yearFrom !== "") {
      filtredCars = filtredCars.filter((car) => car.year >= yearFrom);
    }
    if (yearTo !== "") {
      filtredCars = filtredCars.filter((car) => car.year <= yearTo);
    }
    if (sizeEngineFrom !== "") {
      filtredCars = filtredCars.filter(
        (car) => car.engine?.displacement >= sizeEngineFrom
      );
    }
    if (sizeEngineTo !== "") {
      filtredCars = filtredCars.filter(
        (car) => car.engine?.displacement <= sizeEngineTo
      );
    }

    setFilterCars(filtredCars);
  };

  console.log("abradads", inputPriceFrom);
  return (
    <div>
      <Container>
        <Header />
        <div className="market-container-links">
          <div className="car-links">
            {producers.map((producersList, idx) => {
              if (showAllModels) {
                return (
                  <div
                    key={producersList.id}
                    onClick={() => {
                      onChoseMark(producersList.name);
                      //onFilter()
                    }}
                  >
                    <p>{producersList.name}</p>
                  </div>
                );
              }

              if (idx < 24) {
                return (
                  <div
                    key={producersList.id}
                    onClick={() => {
                      onChoseMark(producersList.name);
                    }}
                  >
                    <p>{producersList.name}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="button-showall">
          <Button stl={"show-all"} onClick={onShowAllModels} text="Show All" />
        </div>
        <p className="params">PARAMS</p>
        <div className="filter-conteiner">
          <div className="filter-dropdown-caontainer">
            <Dropdown
              selected={selectedProducer}
              setSelected={setSelectedProducer}
              values={producers}
            />
            <Dropdown
              selected={selectedModel}
              setSelected={setSelectedModel}
              values={models}
            />
            <Dropdown
              selected={selectedGeneration}
              setSelected={setSelectedGeneration}
              values={generations}
            />
            <Inpits
              stl={"filter"}
              name="Цена от $"
              value={inputPriceFrom}
              setInput={setInputPriceFrom}
            />
            <Inpits
              stl={"filter"}
              name="Цена до $"
              value={inputPriceTo}
              setInput={setInputPriceTo}
            />
            <Inpits
              stl={"filter"}
              name="Год от"
              
              value={yearFrom}
              setInput={setYearFrom}
            />
            <Inpits
              stl={"filter"}
              name="Год до"
              value={yearTo}
              setInput={setYearTo}
            />
            <Inpits
              stl={"filter"}
              name="Объём от"
              value={sizeEngineFrom}
              setInput={setSizeEngineFrom}
            />
            <Inpits
              stl={"filter"}
              name="Объём до"
              value={sizeEngineTo}
              setInput={setSizeEngineTo}
            />
          </div>
          <div className="filter-buttons">
            <Button stl={"filter"} text="Select" onClick={onFilter} />
            <Button
              stl={"filter"}
              text="Clear"
              onClick={() => {
                setFilterCars([]);
                setSelectedGeneration("Поколение");
                setSelectedModel("Модель");
                setSelectedProducer("Марка");
                setInputPriceFrom("");
                
              }}
            />
          </div>
        </div>

        <br />
        {filterCars.length != 0
          ? filterCars.map((car) => {
              return <AutoCard values={car} />;
            })
          : cars.map((car) => {
              return <AutoCard values={car} />;
            })}
      </Container>
    </div>
  );
};

export default Market;
