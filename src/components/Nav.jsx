import React from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Nav = () => {

    function openPopupSignup(){
        $('#popup_signup').fadeIn(300);
    }

    function logout(){
        Cookies.remove('user-login');
        window.location.href = '/';
    }

    return(
        <nav id="navigate" className="nav">
            <a href="/#" className="nav__link">Адрес</a>
            <a href="/#" className="nav__link">Каталог</a>
            <a href="/#" className="nav__link">Контакты</a>
            <a href="/#" className="nav__link-button">Забронировать авто</a>
            <hr className="line"/>
            <a href="/#" onClick={openPopupSignup} id="signnup_link" className="nav__link-account"><img src="img/account_circle.svg" alt="" className="account__img"/></a>
            <Link to="/account" className="nav__link-account" id="signin_link" style={{display: "none"}}><img src="img/rabbit.svg" alt="" className="account__img"/>
            <span className="login__text">{Cookies.get('user-login')}</span></Link>
            <a href="/#" onClick={logout} className="nav__link-account" id="logout" style={{display: "none"}}><img src="img/logout.svg" alt="" className="logout__img"/></a>
        </nav>
    );
}

export default Nav;