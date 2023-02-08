import React from "react";
import Container from "./Container";

const Preview = () => {
    return(
        <div className="offer">
            <Container>
                <h1 className="offer__top-text">Почему нужно выбрать именно нас?</h1>
                <p className="offer__paragraph-text"><span className="xcars__span">XCARS</span> - это маркетплейс, где вы можете арендовать транспорт у местных владельцев по лучшим ценам.
                </p>    
            </Container>
            <Container>
                <div className="offer__items">
                    <div className="offer__items-inner">
                        <div className="offer__items-top">
                            <img src="img/moneymoji.svg" alt="" className="offer__img"/>
                            <span className="offer__inner-toptext">Экономия</span>
                        </div>
                        <p className="offer__inner-textbottom">Сэкономьте до 40% арендуя с нами.</p>
                        <button className="offer__inner-btn">Получить предложения</button>
                    </div>
                    <div className="offer__items-inner">
                        <div className="offer__items-top">
                            <img src="img/firemoji.svg" alt="" className="offer__img"/>
                            <span className="offer__inner-toptext">Скидки</span>
                        </div>
                            <p className="offer__inner-textbottom">Получите лучшие предложения и отличные скидки.</p>
                            <button className="offer__inner-btn">Посмотреть предложения</button>
                    </div>
                    <div className="offer__items-inner">
                        <div className="offer__items-top">
                            <img src="img/boommoji.svg" alt="" className="offer__img"/>
                            <span className="offer__inner-toptext">Качество</span>
                        </div>
                            <p className="offer__inner-textbottom">После каждого заказа проводится техническое обслуживание автомобиля.</p>
                            <button className="offer__inner-btn">Забронировать авто</button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Preview;