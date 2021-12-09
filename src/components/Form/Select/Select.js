import React, { useState } from "react";
import "./Select.css";

function Select({ items = [], name, placeholder, value, onChange = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setIsOpen(false);
    onChange(item);
  };

  return (
    <div className="project_name">
      <label className="status" id="13">
        {name}
        <img
          className="star"
          src={require("../../HomePage/AdminIcons/red-star.svg").default}
        />
      </label>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={`btnSities`}
        id="btnSelect"
      >
        <label className="label_city">{value ? value.name : placeholder}</label>
      </button>
      <img
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="arrow_icon"
        src={require("../../HomePage/AdminIcons/arrow.svg").default}
      />
      {isOpen && (
        <div className="select_status select-items">
          <div className="list city">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  handleSelect(item);
                }}
                className="radio"
              >
                <li
                  className="li1"
                  style={{
                    backgroundColor:
                      value?.id === item.id ? "#A4C2D8" : "#FAFAFA",
                  }}
                >
                  {item.name}
                </li>
              </div>
            ))}
          </div>
        </div>
      )}
      <label className="inputiError"></label>
    </div>
  );
}

export default Select;
