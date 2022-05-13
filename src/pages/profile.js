import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AutoCard from "../components/AutoCard";
import Button from "../components/Button";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ModalEdit from "../components/ModalEdit";
import ModalInfo from "../components/ModalInfo";
import authContext from "../context/authContext";
import "../styles/profile.css";
import { MARKET_ROUTE } from "../utils/consts";

const Profile = () => {
  const { logout, user } = useContext(authContext);
  const [modalActive, setModalActive] = useState(false);
  const [modalInfoActive, setModalInfoActive] = useState(false);

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getResultCars = async () => {
      const result = await fetch(
        "http://localhost:8080/api/v1/car-ad/" + user.id + "/all"
      );
      const resultJSON = await result.json();
      setCars(resultJSON);
    };
    getResultCars();
  }, []);

  const onDelete = async (car) => {
    await fetch("http://localhost:8080/api/v1/car-ad/delete/" + car.id, {
      method: "DELETE",
    });

    const resultCars = cars.filter((carS) => car.id !== carS.id);
    setCars(resultCars);
  };

  return (
    <Container>
      <Header />
      <hr />
      <div className="profile-container">
        <div className="header-profiler">
          <div>Настрйоки</div>
        </div>
        <div className="profile-edit-container">
          <div className="profile-info">
            <div>Name: {user.firstName}</div>
            <div>Номер: {user.phoneNumber}</div>
            <div>Почта: {user.email}</div>
          </div>
          <div className="button-edit-profile">
            <Button
              stl={"adt"}
              text="Редактировать"
              onClick={() => setModalActive(true)}
            />
            <NavLink to={MARKET_ROUTE}>
            <Button stl={"red"} text="Выйти из аккаунта" onClick={logout} />
          </NavLink>
          </div>
          
        </div>
      </div>
      <ModalEdit
        active={modalActive}
        setActive={setModalActive}
        user={user}
        onOpenInfoModal={setModalInfoActive}
      ></ModalEdit>
      <ModalInfo
        active={modalInfoActive}
        setActive={setModalInfoActive}
        info={"Информация изменена"}
      ></ModalInfo>
      <hr />
      {cars.map((car) => {
        return (
          <div className="card-profile">
            <AutoCard values={car} />
            <img
              onClick={() => onDelete(car)}
              className="card-basket"
              src="https://img.icons8.com/ios-glyphs/344/trash--v1.png"
            />
          </div>
        );
      })}
      <Footer/>
    </Container>
  );
};

export default Profile;
