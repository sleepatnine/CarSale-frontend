import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/autocard.css";
import { CAR_ROUTE } from "../utils/consts";
import { useEffect, useState } from "react";

const AutoCard = ({ values }) => {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const getPhoto = async () => {
      const photo = await fetch('http://localhost:8080/api/v1/car-ad/file/' + values.id + '/all')
      const jsonPhoto = await photo.json();
      setPhoto(jsonPhoto)
    }
    getPhoto();
  }, [values])

  console.log('photo', photo)

  return (
    <NavLink to={`${CAR_ROUTE}/${values.id}`} className="card">
      <div className="card-container">
        <div className="card-img">
          {
            photo[0] ?
            <img src={'http://localhost:8080/api/v1/car-ad/file/' + photo[0].id} alt='car'></img> : null
          }
         
        </div>
        <div className="card-producer">
          {values.generation.model.producer.name}{" "}
          {values.generation?.model?.name} {values.generation?.name}
          <div className="card-location">
            {values.location}
          </div>
        </div>
        <div className="card-body">
          {values.body.name}
          <br />
          {values.transmission.type}
          <br />
          {values.engine.displacement / 1000}L {values.engine.type}
          <br /> {values.drive.type}
          <br />
          {values.color.name}
        </div>
        <div className="card-price"> {values.price}$ </div>
      </div>
    </NavLink>
  );
};

export default AutoCard;
