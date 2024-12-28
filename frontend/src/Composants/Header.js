import React from 'react';
import './Header.css';
const Header = () => {
    return (
        <>
        <header className="header">
        <img src="./the.PNG" alt="logo"></img>
       </header>
        <div className="banner">
        <div className="banner-content">
            <h1>Improve your skills on your own<br />To prepare for a better future</h1>
            <button className="register-btn">REGISTER NOW</button>
        </div>
    </div>
    </>
    );
};

export default Header;
