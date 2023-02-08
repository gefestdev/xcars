import React from "react";
import Container from "./Container";

const Footer = () => {
    return(
        <footer className="footer">
            <Container>
                <div className="footer__inner">
                    <ul className="footer__item">
                        <li className="footer__item-inner">
                            <img style={{margin: "0"}} src="img/logo.svg" alt="" className="logo"/>
                        </li>
                        <li className="footer__item-inner">
                            <p className="footer__item-text">Lorem ipsum sit amet, consectetur adipiscing elit.
                            </p>
                        </li>
                    </ul>
                    <ul className="footer__item">
                        <li className="footer__item-inner">
                            <h3 className="footer__top-text">Контакты</h3>
                        </li>
                        <li className="footer__item-inner">
                            <p className="footer__item-text">+79830000000</p>
                        </li>
                        <li className="footer__item-inner">
                            <p className="footer__item-text">support@xcars.com</p>
                        </li>
                    </ul>
                    <ul className="footer__item">
                        <li className="footer__item-inner">
                            <h3 className="footer__top-text">Адрес</h3>
                        </li>
                        <li className="footer__item-inner">
                            <p className="footer__item-text">Кемерово, Россия</p>
                        </li>
                    </ul>
                    <ul className="footer__item">
                        <li className="footer__item-inner">
                            <h3 className="footer__top-text">Партнёры</h3>
                        </li>
                        <li className="footer__item-inner">
                            <p className="footer__item-text">GefesT Developer</p>
                        </li>
                    </ul>
                    <ul className="footer__item">
                        <li className="footer__item-inner">
                            <h3 className="footer__top-text">Социальные сети</h3>
                        </li>
                        <li className="footer__item-inner">
                            <div className="footer__item-social">
                                <a target="_blank" rel="noopener noreferrer" href="https://vk.com" className="footer__item-link"><img src="img/vk.svg" alt="" className="footer__social-img"/></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/dQw4w9WgXcQ" className="footer__item-link"><img src="img/rossgram.svg" alt="" className="footer__social-img"/></a>
                                <a target="_blank" rel="noopener noreferrer" href="https://t.me/gefestexe" className="footer__item-link"><img src="img/telegram.svg" alt="" className="footer__social-img"/></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;