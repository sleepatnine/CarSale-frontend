import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";

const AddCar = () => {
  const [producers, setProducers] = useState([]);
  const [cars, setCars] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [year, setYear] = useState([]);
  const [body, setBody] = useState([]);
  const [color, setColor] = useState([]);
  const [drive, setDrive] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [engine, setEngine] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState("Марка");
  const [selectedModel, setSelectedModel] = useState("Модель");
  const [selectedGeneration, setSelectedGeneration] = useState("Поколение");
  const [selectedYear, setSelectedYear] = useState("Год выпуска");
  const [selectedBody, setSelectedBody] = useState("Кузов");
  const [selectedColor, setSelectedColor] = useState("Цвет");
  const [selectedDrive, setSelectedDrive] = useState("Привод");
  const [selectedTransmission, setSelectedTransmission] = useState("Коробка передач");
  const [selectedEngine, setSelectedEngine] = useState("Двигатель");
  

  useEffect(() => {
    const getResult = async () => {
      const result = await fetch("http://localhost:8080/api/v1/producer/all");
      const resultJSON = await result.json();
      setProducers(resultJSON);
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
      const result = await fetch("http://localhost:8080/api/v1/transmission/all");
      const resultJSON = await result.json();
      setTransmission(resultJSON);
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

  return (
    <div>
      <h1>Новое обьявление</h1>
      <h2>Введите данные о машине</h2>
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
      <Dropdown
        selected={selectedYear}
        setSelected={setSelectedYear}
        // values={generations}
      />
      <Dropdown
        selected={selectedBody}
        setSelected={setSelectedBody}
         values={body}
      />
      <Dropdown
        selected={selectedColor}
        setSelected={setSelectedColor}
        values={color}
      />
      <Dropdown
        selected={selectedDrive}
        setSelected={setSelectedDrive}
        values={drive}
      />
      <Dropdown
        selected={selectedTransmission}
        setSelected={setSelectedTransmission}
        values={transmission}
      />
      <Dropdown
        selected={selectedEngine}
        setSelected={setSelectedEngine}
        values={engine}
      />
    </div>
  );
};

export default AddCar;
