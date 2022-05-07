import React, { useState } from "react";
import "./../styles/dropdown.css";

const Dropdown = ({ selected, setSelected, values }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
      </div>
      {isActive && values.length > 0 && (
        <div className="dropdown-content">
          {values.map((option) => (
            <div
              onClick={(e) => {
                setSelected(
                  option.name ||
                    (option.type && option.displacement
                      ? parseFloat(option.displacement / 1000) +
                        "L " +
                        option.type
                      : option.type) ||
                    option
                );

                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.name ||
                (option.type && option.displacement
                  ? option.displacement / 1000 + "L " + option.type
                  : option.type) ||
                option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
