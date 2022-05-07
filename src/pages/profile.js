import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import Header from "../components/Header";
import ModalEdit from "../components/ModalEdit";
import authContext from "../context/authContext";
import "../styles/profile.css";
import { MARKET_ROUTE } from "../utils/consts";

const Profile = () => {
  const { logout, user } = useContext(authContext);
  const [modalActive, setModalActive] = useState(false);

  return (
    <Container>
      <Header />
      <div className="profile-container">
        <div className="header-profiler">
          <div>Настрйоки</div>
          <div className="button-edit-profile">
          <Button
            stl={"adt"}
            text="Редактировать"
            onClick={() => setModalActive(true)}
          /></div>
        </div>
        <div className="profile-info">
          <div>Name: {user.firstName}</div>
          <div>Номер: {user.phoneNumber}</div>
          <div>Почта: {user.email}</div>
        </div>
        <NavLink to={MARKET_ROUTE}>
          <Button stl={"adt"} text="Выйти из аккаунта" onClick={logout} />
        </NavLink>
      </div>
      <ModalEdit
        active={modalActive}
        setActive={setModalActive}
        user={user}
        logout={logout}
      ></ModalEdit>
    </Container>
  );
};

export default Profile;
