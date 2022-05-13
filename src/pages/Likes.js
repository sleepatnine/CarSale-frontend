import React, { useEffect, useState, useContext } from "react";
import AutoCard from "../components/AutoCard";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import authContext from "../context/authContext";

const Likes = () => {
  const [cars, setCars] = useState([]);
  const user = useContext(authContext);
  useEffect(() => {
    const getResultCars = async () => {
      const result = await fetch(
        "http://localhost:8080/api/v1/car-ad/" + user.user.id + "/liked"
      );
      const resultJSON = await result.json();
      setCars(resultJSON);
    };
    getResultCars();
  }, []);


  return (
    <Container>
      <Header />
      <hr />
      {cars.map((car) => {
        return <AutoCard values={car} />;
      })}
      <Footer/>
    </Container>
  );
};

export default Likes;
