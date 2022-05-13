import React, { useContext, useState, useEffect } from "react";
import authContext from "../context/authContext";

const Like = (carId) => {
  const [isLike, setIsLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const user = useContext(authContext);

  useEffect(() => {
    const getLike = async () => {
      const data = await fetch(
        "http://localhost:8080/api/v1/car-ad/" + user.user.id + "/liked"
      );
      const dataResult = await data.json();
      setIsLike(dataResult.some((el) => el?.id + "" === carId?.carId));
    };
    getLike();
  }, []);

  const onLiked = () => {
    const getResultCars = async () => {
      await fetch(
        "http://localhost:8080/api/v1/user/" +
          user.user.id +
          "/like/" +
          carId.carId
      );
    };
    getResultCars();
    setIsLike(true);
  };

  const onDisliked = () => {
    const getResultCars = async () => {
      await fetch(
        "http://localhost:8080/api/v1/user/" +
          user.user.id +
          "/dislike/" +
          carId.carId
      );
    };
    getResultCars();
    setIsLike(false);
  };

  return (
    <div className="like-picture">
      {isLike ? (
        <img
          onClick={() => onDisliked()}
          src="https://img.icons8.com/fluency/452/heart-plus.png"
        />
      ) : (
        <img
          onClick={() => onLiked()}
          src="https://img.icons8.com/ios/452/heart-plus.png"
        />
      )}
    </div>
  );
};

export default Like;
