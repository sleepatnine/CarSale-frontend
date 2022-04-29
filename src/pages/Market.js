import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Button from "../components/Button";
import authContext from "../context/authContext";
import { ADT_ROUTE, LOGIN_ROUTE, MARKET_ROUTE, LIKES_ROUTE } from "../utils/consts";
import Dropdown from "../components/Dropdown";
import "./../styles/market.css";
import AutoCard from "../components/AutoCard";
import Container from "../components/Container";
import AccountLogo from "../components/AccountLogo";

const Market = () => {
  const { isAuth } = useContext(authContext);
  const [producers, setProducers] = useState([]);
  const [cars, setCars] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [showAllModels, setShowAllModels] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);
  const [selectedProducer, setSelectedProducer] = useState("Марка");
  const [selectedModel, setSelectedModel] = useState("Модель");
  const [selectedGeneration, setSelectedGeneration] = useState("Поколение");

  let history = useHistory();

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch(
        "http://localhost:8080/api/v1/producer/all"
      );
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

  const onAddAdt = () => {
    if (isAuth) {
      history.push(ADT_ROUTE);
    } else {
      history.push(LOGIN_ROUTE);
    }
  };

  const onAccount = () =>{
    if (isAuth) {
      history.push(LIKES_ROUTE);
    } else {
      history.push(LOGIN_ROUTE);
    }
  }

  const onShowAllModels = () => {
    setShowAllModels(true);
  };

  const onShowAllCars = () => {
    const getResultCars = async () => {
      const result = await fetch("http://localhost:8080/api/v1/car-ad");
      const resultJSON = await result.json();
      setCars(resultJSON);
    };
    getResultCars();
    setShowAllCars(true);
  };

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
    setShowAllCars(true);
  };

  return (
    <div>
      <Container>
        <div className="header">
          <div className="market-logo">
            <NavLink to={MARKET_ROUTE}>CarSale</NavLink>
          </div>
          <div className="header-button">
          {isAuth ? <AccountLogo/> : <Button stl={"login"} onClick={onAccount} text="Войти" />}
          
            
            <Button stl={"adt"} onClick={onAddAdt} text="Подать обьявление" />
          </div>
        </div>

        <div className="market-container-links">
          <div className="car-links">
            {producers.map((producersList, idx) => {
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
            })}
          </div>
        </div>
        <div>
          <Button stl={"show-all"} onClick={onShowAllModels} text="Show All" />
        </div>
        <p>PARAMS</p>
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
            <Dropdown />
            <Dropdown />
            <Dropdown />
          </div>
          <div className="filter-buttons">
            <Button stl={"filter"} text="Select" />
            <Button stl={"filter"} text="Clear" />
          </div>
        </div>
        <br />
        <br />
        <Button
          stl={"show-all"}
          onClick={onShowAllCars}
          text="View all model"
        />
        <br />
        {cars.map((car) => {
          if (showAllCars) {
            return <AutoCard values={car} />;
          }
        })}
      </Container>
    </div>
  );
};

export default Market;
