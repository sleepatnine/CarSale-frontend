import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { MARKET_ROUTE } from "../utils/consts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "./../components/Modal";
import authContext from "../context/authContext";
import classNames from "classnames";
import Header from "../components/Header";
import "./../styles/CarPage.css";

const CarPage = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  //const user = useContext(authContext);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpenGallery, setIsOpenGallery] = useState(false);

  const countSlides = classNames({
    1: photos.length === 1,
    2: photos.length === 2,
    3: photos.length === 3,
    4: photos.length > 3,
  });

  useEffect(() => {
    const getCar = async () => {
      const data = await fetch("http://localhost:8080/api/v1/car-ad/" + id);
      const dataResult = await data.json();
      setCarData(dataResult);
    };

    getCar();
  }, []);

  useEffect(() => {
    const getAllPhotos = async () => {
      const photos = await fetch(
        "http://localhost:8080/api/v1/car-ad/file/" + id + "/all"
      );
      const jsonPhotos = await photos.json();
      setPhotos(jsonPhotos);
    };

    getAllPhotos();
  }, [id]);

  const {
    price,
    mileage,
    description,
    year,
    location,
    engine,
    generation,
    body,
    transmission,
    drive,
    color,
    user,
  } = carData;

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  return (
    <div className="carpage">
      <div className="header-border">
        <Header />
      </div>

      <hr />
      <div className="carpage-footer">
        <div className="сarpage-main-info">
          {generation?.model?.producer?.name} {generation?.model?.name}{" "}
          {generation?.name}, {location}{" "}
        </div>
        <div className="car-date">Date of ADT</div>
      </div>
      <hr />

      <div className="car-cantainer">
        <div className="photos">
          <Slider
            asNavFor={nav2}
            ref={(slider1) => setNav1(slider1)}
            infinite={true}
          >
            {photos.map((photo) => {
              return (
                <div className="main-photo">
                  <img
                    src={"http://localhost:8080/api/v1/car-ad/file/" + photo.id}
                  />
                </div>
              );
            })}
          </Slider>

          <div>
            <Slider
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
        </div>
        <div className="car-information">
          <div className="car-info-price">Цена: {price}$</div>
          <div className="car-all-info">
            <div>Год выпуска: {year} г.</div>
            <div>
              Кузов: {body?.name}, {color?.name}
            </div>
            <div>
              Двигатель: {engine?.displacement / 1000}L, {engine?.type}
            </div>
            <div>Коробка передач:{transmission?.type}</div>
            <div>Привод: {drive?.type}</div>
            <div>Пробег: {mileage} km</div>
          </div>
          <Button
            stl={"adt"}
            text="Информация о продавце"
            onClick={() => setModalActive(true)}
          />
        </div>
      </div>
      <hr />
      <div>
        <h1>Описание</h1>
      </div>
      <div className="description">{description}</div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        user={user}
      ></Modal>
    </div>
  );
};

export default CarPage;
