import React, { useState } from 'react';
import "./Navbar.css";

function Navbar({ handleColorChange, handleObjectChange }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [objectDropdownVisible, setObjectDropdownVisible] = useState(false);

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
    { color: '#ffffff', label: 'White', value: 0xffffff },
    { color: '#ff0000', label: 'Red', value: 0xff0000 },
    { color: '#00ff00', label: 'Green', value: 0x00ff00 },
    { color: '#0000ff', label: 'Blue', value: 0x0000ff },
    { color: '#ffff00', label: 'Yellow', value: 0xffff00 },
    { color: '#ff00ff', label: 'Magenta', value: 0xff00ff },
    // Add more colors here as needed
  ];

  const objectOptions = [
    { label: 'Pyramid', value: 'pyramid' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Cube', value: 'cube' },
    // Add more objects here as needed
  ];

  return (
    <nav className="navbar">
      <div className="dropdown">
        <h2 className="dropbtn" onClick={toggleDropdown}>Change Color</h2>
        <div className={`dropdown-content ${dropdownVisible ? 'show' : ''}`} onClick={closeDropdowns}>
          {colorOptions.map((option, index) => (
            <button key={index} style={{ backgroundColor: option.color }} onClick={() => handleColorChange(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Add a space here */}
      <div className="space"></div>
      <div className="space"></div>
      
      <div className="dropdown">
        <h2 className="dropbtn" onClick={toggleObjectDropdown}>Change Object</h2>
        <div className={`dropdown-content ${objectDropdownVisible ? 'show' : ''}`} onClick={closeDropdowns}>
          {objectOptions.map((option, index) => (
            <button key={index} onClick={() => handleObjectChange(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
