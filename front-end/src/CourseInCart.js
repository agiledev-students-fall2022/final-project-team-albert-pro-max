import React from "react";
import "./CourseInCart.css";
import { useState, useEffect } from "react";
const CourseInCart = ({ show, setShow, name }) => {
  const [showText, setShowText] = useState("show");
  const [watchText, setWatchText] = useState("watch");

  const [watch, setWatch] = useState(false);

  useEffect(() => {
    if (show) setShowText("unshow");
    else setShowText("show");
  }, [show]);

  useEffect(() => {
    if (watch) setWatchText("unwatch");
    else setWatchText("watch");
  }, [watch]);

  const handleShow = () => {
    setShow(!show);
  };
  const handleWatch = () => {
    setWatch(!watch);
  };
  return (
    <div className="CourseInCart">
      {name}
      <button id="watch" onClick={handleWatch}>
        {watchText}
      </button>
      <button id="show" onClick={handleShow}>
        {showText}
      </button>
    </div>
  );
};
export default CourseInCart;