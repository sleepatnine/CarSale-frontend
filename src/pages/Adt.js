import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import Button from "../components/Button";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Inputs from "../components/Inputs";
import classNames from "classnames";
import "../styles/Adt.css";
import { NavLink } from "react-router-dom";
import { CAR_ROUTE } from "../utils/consts";
import ModalInfo from "../components/ModalInfo";
import authContext from "../context/authContext";
import Footer from "../components/Footer";

const AddCar = () => {
  const [producers, setProducers] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [year, setYear] = useState([]);
  const [body, setBody] = useState([]);
  const [color, setColor] = useState([]);
  const [drive, setDrive] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [engine, setEngine] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState("Марка");
  const [selectedModel, setSelectedModel] = useState("Модель");
  const [selectedGeneration, setSelectedGeneration] = useState("Поколение");
  const [selectedYear, setSelectedYear] = useState("Год выпуска");
  const [selectedBody, setSelectedBody] = useState("Кузов");
  const [selectedColor, setSelectedColor] = useState("Цвет");
  const [selectedDrive, setSelectedDrive] = useState("Привод");
  const [selectedTransmission, setSelectedTransmission] =
    useState("Коробка передач");
  const [selectedEngine, setSelectedEngine] = useState("Двигатель");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState(null);
  const [modalActiveOk, setModalActiveOk] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const okInfo = "Данные успешно добавлены"
  const noOkInfo = "Не все поля заполнены"

  const user = useContext(authContext);

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
      const result = await fetch(
        "http://localhost:8080/api/v1/transmission/all"
      );
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
      setYear([]);
      const result = await fetch(
        "http://localhost:8080/api/v1/generation/years/" + selectedGeneration
      );
      const resultJSON = await result.json();
      setYear(resultJSON);
      setSelectedYear("Год выпуска");
    };

    getGenerations();
  }, [selectedGeneration]);

  const onAddAdt = async (e, values) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/car-ad/add", {
      method: "POST",
      headers: {
        Accept: "applications/json,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: price,
        mileage: mileage,
        description: description,
        year: selectedYear + "",
        location: city,
        generation: {
          id: generations.filter((generation) => {
            return generation.name == selectedGeneration;
          })[0].id,
        },
        body: selectedBody,
        transmission: selectedTransmission,
        engine: {
          id: engine.filter((eng) => {
            return eng.displacement / 1000 + "L " + eng.type == selectedEngine;
          })[0].id,
        },
        drive: selectedDrive,
        color: selectedColor,
        user: {
          id: user.user.id,
        },
      }),
    });

    let dataJSON = await result.json();
    setId(dataJSON);
    if (result.ok) {
      setModalActiveOk(true);
      setFlag(true);
    }
    else
    {
      setModalActive(true);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await fetch("http://localhost:8080/api/v1/car-ad/" + id + "/file", {
      method: "POST",
      connection: "keep-alive",
      headers: {
        "Contetnt-Type": "multipart/form-data",
      },
      body: formData,
    });

    const photos = await fetch(
      "http://localhost:8080/api/v1/car-ad/file/" + id + "/all"
    );
    const jsonPhotos = await photos.json();
    setPhotos(jsonPhotos);
  };

  useEffect(() => {
    const getAllPhotos = async () => {
      const photos = await fetch(
        "http://localhost:8080/api/v1/car-ad/file/" + id + "/all"
      );
      const jsonPhotos = await photos.json();
      setPhotos(jsonPhotos);
    };
    if (id) {
      getAllPhotos();
    }
  }, [id, addedPhoto]);

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const countSlides = classNames({
    1: photos.length === 1,
    2: photos.length === 2,
    3: photos.length === 3,
    4: photos.length > 3,
  });

  return (
    <Container>
      <Header />
      <hr />
      <h2>Новое обьявление</h2>
      <h1>Введите данные о машине</h1>
      <form onSubmit={onAddAdt}>
        <div className="main-input-info">
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
            values={year}
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
          <Inputs
            stl={"adt-input"}
            name="Пробег"
            value={mileage}
            setInput={setMileage}
          />
          <Inputs
            stl={"adt-input"}
            name="Город"
            value={city}
            setInput={setCity}
          />
          <Inputs
            stl={"adt-input"}
            name="Цена"
            value={price}
            setInput={setPrice}
          />
        </div>
        <h2 className="description-adt">zdarova bando</h2>
        <textarea
          className="input--descri"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Напишите описание"
        />
        <Button
          stl={"add"}
          text="Перейти к добавлению фото"
          type="submit"
          onClick={onAddAdt}
        ></Button>
      </form>

      {flag && (
        <div>
          <div className="footer-photos">
            <Slider
              className="photos-adt"
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              slidesToShow={+countSlides}
              swipeToSlide={true}
              focusOnSelect={true}
              infinite={true}
            >
              {photos.map((photo) => {
                return (
                  <div className="child-photo">
                    <img
                      src={
                        "http://localhost:8080/api/v1/car-ad/file/" + photo.id
                      }
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
          <label>
            <input
              type="file"
              className="file__hidden"
              onChange={handleChange}
              // onClick={handleUpload}
            />
            <div className="custom">Загрузить файл</div>
          </label>
          <NavLink to={`${CAR_ROUTE}/${id}`}>
            <button className="button-create-adt">Перейти к обьявлению</button>
          </NavLink>
        </div>
      )}
      <ModalInfo
        active={modalActiveOk}
        setActive={setModalActiveOk}
        info={okInfo}
      ></ModalInfo>
       <ModalInfo
        active={modalActive}
        setActive={setModalActive}
        info={noOkInfo}
      ></ModalInfo>
      <Footer/>
    </Container>
  );
};

export default AddCar;
