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
  const [sortCars, setSortCars] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Сортировать");
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
  const [isProducerClicked, setIsProducerClicked] = useState(false);
  const [isSortClicked, setIsSortClicked] = useState(false);
  const [flag, setFlag] = useState(false);

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
    setFlag(true);
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
    setIsProducerClicked(!isProducerClicked);
  };

  const onChoseModel = (model) => {
    setSelectedModel(model);
    setIsProducerClicked(!isProducerClicked);
  };

  const onChoseGeneration = (model) => {
    setSelectedGeneration(model);
    setIsProducerClicked(!isProducerClicked);
  };

  useEffect(() => {
    onFilter();
  }, [isProducerClicked]);

  const sort = [
    "Дешёвые",
    "Дорогие",
    "Мин. пробег",
    "Макс. пробег",
    "Новые Объявл.",
    "Старые Объявл.",
  ];

  useEffect(() => {
    onSort(selectedSort);
    setIsSortClicked(!isSortClicked);
  }, [selectedSort]);

  useEffect(() => {
    setSortCars(cars);
    onSort(selectedSort);
  }, [cars]);

  const onSort = (sort) => {
    let sortedCars = cars;

    if (sort === "Сортировать") {
      sortedCars = cars;
    }
    if (sort === "Дешёвые") {
      sortedCars = sortedCars.sort((car, cars) => car.price - cars.price);
    }
    if (sort === "Дорогие") {
      sortedCars = sortedCars.sort((car, cars) => cars.price - car.price);
    }
    if (sort === "Мин. пробег") {
      sortedCars = sortedCars.sort((car, cars) => +car.mileage - +cars.mileage);
    }
    if (sort === "Макс. пробег") {
      sortedCars = sortedCars.sort((car, cars) => +cars.mileage - +car.mileage);
    }
    if (sort === "Новые Объявл.") {
      sortedCars = sortedCars.sort(
        (car, cars) => new Date(car.createdOn) - new Date(cars.createdOn)
      );
    }
    if (sort === "Старые Объявл.") {
      sortedCars = sortedCars.sort(
        (car, cars) => new Date(cars.createdOn) - new Date(car.createdOn)
      );
    }

    setCars(sortedCars);

    let filtredCars = sortCars;

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

  const onFilter = () => {
    let filtredCars = sortCars;

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

  return (
    <div>
      <Container>
        <Header />
        <div className="market-container-links">
          <div className="car-links">
            {selectedProducer === "Марка"
              ? producers.map((producersList, idx) => {
                  if (showAllModels) {
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
                })
              : selectedModel === "Модель"
              ? models.map((producersList) => {
                  return (
                    <div
                      key={producersList.id}
                      onClick={() => {
                        onChoseModel(producersList.name);
                      }}
                    >
                      <p>{producersList.name}</p>
                    </div>
                  );
                })
              : generations.map((producersList) => {
                  return (
                    <div
                      key={producersList.id}
                      onClick={() => {
                        onChoseGeneration(producersList.name);
                      }}
                    >
                      <p>{producersList.name}</p>
                    </div>
                  );
                })}
          </div>
        </div>
        {selectedProducer === "Марка" && (
          <div className="button-showall">
            {!flag && (
              <Button
                stl={"show-all"}
                onClick={onShowAllModels}
                text="Show All"
              />
            )}
          </div>
        )}

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
              stl={"clear"}
              text="Clear"
              onClick={() => {
                setFilterCars([]);
                setSelectedGeneration("Поколение");
                setSelectedModel("Модель");
                setSelectedProducer("Марка");
                setInputPriceFrom("");
                let inputs = document.querySelectorAll(
                  ".filter-conteiner input"
                );
                inputs.forEach((input) => {
                  input.value = "";
                });
              }}
            />
          </div>
        </div>
        <br />
        <div className="drops-sort">
          <h3>Sort by</h3>
          <div className="dropdown-sort">
            <Dropdown
              selected={selectedSort}
              setSelected={setSelectedSort}
              values={sort}
            />
          </div>
        </div>
        {filterCars.length != 0
          ? filterCars.map((car) => {
              return <AutoCard values={car} />;
            })
          : sortCars.map((car) => {
              return <AutoCard values={car} />;
            })}
      </Container>
    </div>
  );
};

export default Market;
