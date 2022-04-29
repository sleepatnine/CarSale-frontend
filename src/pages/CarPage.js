import React,{useContext} from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import {NavLink } from "react-router-dom";
import { MARKET_ROUTE } from "../utils/consts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../styles/CarPage.css";
import Modal from "./../components/Modal";
import authContext from "../context/authContext";

const CarPage = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [modalActive, setModalActive] = useState(true)
  const user = useContext(authContext);

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
  } = carData;

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();


  /*
     <Popup 
          className="popup-with-zoom-anim" 
          href="#small-dialog"
          config={dialogZoomConfig}
        >
          Open with fade-zoom animation
        </Popup>
      */
  const dialogZoomConfig = {
    type: "inline",
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
  };

  return (
    <div className="carpage">
      <div className="carpage-footer">
        <div className="сarpage-main-info">
          {carData?.generation?.model?.producer?.name}{" "}
          {carData?.generation?.model?.name} {carData?.generation?.name},{" "}
          {location}{" "}
        </div>
        <div className="car-date">Date of ADT</div>
      </div>
      <hr />

      <div className="car-cantainer">
        <div className="photos">
          <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
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
          <Slider
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            slidesToShow={4}
            swipeToSlide={true}
            focusOnSelect={true}
          >
            {photos.map((photo) => {
              return (
                <div className="child-photo">
                  <img
                    src={"http://localhost:8080/api/v1/car-ad/file/" + photo.id}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="car-information">
          <div className="car-info-price">Цена: {price}$</div>
          <div className="car-all-info">
            <div>
              {year} г.
            </div>
            <div>
              {body?.name}, {color?.name}
            </div>
            <div>
              {engine?.displacement/1000}L, {engine?.type}
            </div>
            <div>
              {transmission?.type}
            </div>
            <div>
                {drive?.type}
            </div>
            <div>
              {mileage} km
            </div>
          </div>
          <Button stl={"adt"} text="Информация о продавце" onClick={()=>setModalActive(true)} />
          <div>{user?.firstName}</div>
        </div>
      </div>
      <hr />
      <div >
          <h1>Описание</h1> 
        </div>
      <div className="description">
          {description}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>123</Modal>
    </div>
  );
};

export default CarPage;
