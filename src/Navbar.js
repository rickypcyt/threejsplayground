import React, { useState } from "react";
import "./Navbar.css";

function Navbar({
  handleColorChange,
  handleObjectChange,
  handleSizeChange,
  activateBorder,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [objectDropdownVisible, setObjectDropdownVisible] = useState(false);
  const [selectedObject, setSelectedObject] = useState("cube");
  const [borderActive, setBorderActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleObjectDropdown = () => {
    setObjectDropdownVisible(!objectDropdownVisible);
  };

  const closeDropdowns = () => {
    setDropdownVisible(false);
    setObjectDropdownVisible(false);
  };

  const colorOptions = [
    { color: "#ffffff", label: "White", value: 0xffffff },
    { color: "#ff0000", label: "Red", value: 0xff0000 },
    { color: "#00ff00", label: "Green", value: 0x00ff00 },
    { color: "#0000ff", label: "Blue", value: 0x0000ff },
    { color: "#ffff00", label: "Yellow", value: 0xffff00 },
    { color: "#ff00ff", label: "Magenta", value: 0xff00ff },
    // Add more colors here as needed
  ];

  const objectOptions = [
    { label: "Pyramid", value: "pyramid" },
    { label: "Sphere", value: "sphere" },
    { label: "Cube", value: "cube" },
    { label: "Cylinder", value: "cylinder" }, // New object: Cylinder
    { label: "Torus", value: "torus" }, // New object: Torus
    // Add more objects
    // Add more objects here as needed
  ];

  const handleObjectClick = (value) => {
    setSelectedObject(value);
    handleObjectChange(value);
    setBorderActive(false);
    if (borderActive && selectedObject !== value) {
      activateBorder(null);
    }
  };

  const handleBorderClick = () => {
    setBorderActive(!borderActive);
    if (!borderActive) {
      activateBorder(selectedObject);
    } else {
      activateBorder(null);
    }
  };

  const handleSizeSliderChange = (event) => {
    const newSize = parseFloat(event.target.value);
    handleSizeChange(newSize);
  };

  return (
    <nav className="navbar">
      <div className="dropdown" style={{ flex: 0.25 }}>
        <h2 className="dropbtn" onClick={toggleDropdown}>
          Change Color
        </h2>
        <div
          className={`dropdown-content ${dropdownVisible ? "show" : ""}`}
          onClick={closeDropdowns}
        >
          {colorOptions.map((option, index) => (
            <button
              key={index}
              style={{ backgroundColor: option.color }}
              onClick={() => handleColorChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dropdown" style={{ flex: 0.25 }}>
        <h2 className="dropbtn" onClick={toggleObjectDropdown}>
          Change Object
        </h2>
        <div
          className={`dropdown-content ${objectDropdownVisible ? "show" : ""}`}
          onClick={closeDropdowns}
        >
          {objectOptions.map((option, index) => (
            <button
              key={index}
              className={selectedObject === option.value ? "selected" : ""}
              onClick={() => handleObjectClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dropdown" style={{ flex: 1.25, marginLeft: "auto" }}>
        <h2 className="dropbtn" onClick={handleBorderClick}>
          {borderActive ? "Deactivate Border" : "Activate Border"}
        </h2>
      </div>
    </nav>
  );
}

export default Navbar;
