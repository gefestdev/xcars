import React from "react";
import Cookies from "js-cookie";
import Nav from "./Nav";
import $ from "jquery";
import { Link } from "react-router-dom";

const Header = () => {

    $( document ).ready(function() {
        if(Cookies.get('user-login') !== undefined){
            document.getElementById('signin_link').style.display = "inherit";
            document.getElementById('logout').style.display = "inherit";
            document.getElementById('signnup_link').style.display = "none";
            document.getElementById('navigate').style.minWidth = '636px';
        }
        else {
            document.getElementById('signin_link').style.display = "none";
            document.getElementById('signnup_link').style.display = "inherit";
        }
    });
    return (
        <header className="header">
            <div className="wrapper">
                <Link to="/" className="logo__link"><img src="img/logo.svg" alt="" className="logo"/></Link>
                <Nav></Nav>
            </div>
        </header>
    );     
}

export default Header;