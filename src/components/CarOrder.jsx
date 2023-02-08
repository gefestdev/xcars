import axios from "axios";
import React from "react";
import $ from "jquery";
import { useState } from "react";
import Cookies from "js-cookie";

const CarOrder = () => {
    const [days, setDay] = useState([0])
    const [price, setPrice] = useState([0])
    const [discount, setDiscount] = useState(0)
    
    window.scrollTo(0, 0);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    
    function getNumberOfDays(start, end) {
        const date1 = new Date(start);
        const date2 = new Date(end);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays;
    }

    function onChange(e) {
        let days = getNumberOfDays(document.getElementById("datetake").value, e.target.value)
        setDay(...[days])
    }
    
    let paramsString = document.location.search;
    let searchParams = new URLSearchParams(paramsString);


    const handleSubmitOrder = (event) => {
        event.preventDefault();

        axios.post('/api/getuser', { //убрать и сделать в виде массиве useState
            login: Cookies.get('user-login')
        })
        .then(function(response){
            axios.post('/api/addorder', {
                id_user: response.data.id,
                id_car: searchParams.get('id'),
                date_start: event.target.datetake.value,
                date_end: event.target.dateout.value,
                price: discount,
                real_date_end: null,
                status: "Активен"
            })
            .then(function(response){
                $('.notification').fadeIn(300)
                setTimeout(function() {
                    $('.notification').fadeOut(300)
                }, 5000);
            })
            .catch(function(response){
                alert(response.response.data.errors)
            })
        })
        .catch(function(response){
            alert("Произошла какая-то ошибка, перезайдите")
        })
    }

    function openPopupConf(event){
        event.preventDefault();
        $('#confirmation').fadeIn(300);
    }

    function closePopupConf(event){
        event.preventDefault();
        $('#confirmation').fadeOut(300);
    }

    function closePopupConfAccept(){
        $('#confirmation').fadeOut(300);
    }


    $(document).ready(function(){
            axios.post('/api/carorder', {
                id: searchParams.get("id")
            }).then(function(response){
                document.getElementById("price").innerHTML = response.data.price + " ₽";
                document.getElementById("carImg").src = response.data.image;
                document.getElementById("carBrand").innerHTML = response.data.brand;
                document.getElementById("brandCar").innerHTML = response.data.brand;
                // eslint-disable-next-line
                document.getElementById("dayCount").innerHTML = "₽ " + response.data.price + " x " + days + " дней";
                document.getElementById("dateConf").innerHTML = days + " дней";
                let finally_coast = response.data.price * days
                document.getElementById("finallyCoast").innerHTML = "₽ " + finally_coast
                let service_fee = Math.round((finally_coast / 100 * 3))
                document.getElementById("service_fee").innerHTML = "₽ " + service_fee
                document.getElementById("finally").innerHTML = "₽ " + (discount)
                document.getElementById("priceConf").innerHTML = "₽ " + (discount)
                setPrice(...[service_fee + finally_coast])
                $('#carOrder').fadeIn(500)
            })
            .catch(function(response){
                alert(response.response.data.errors)
                window.location.href = "/"
            })

            axios.post('/api/getuser', {
                login: Cookies.get('user-login')
            }).then(function(response){
                let dateBirth = new Date(response.data.date_of_birth)
                let raznica = new Date().getFullYear() - (new Date().getFullYear() - dateBirth.getFullYear())
                let currentDate = new Date(new Date().setFullYear(raznica))
                console.log(currentDate)
                axios.post('/api/getuserorders', {
                    id_user: response.data.id
                }).then(function(response){

                    let prevDate = new Date(currentDate.setDate(currentDate.getDate()-10))
                    let futureDate = new Date(currentDate.setDate(currentDate.getDate()+10*2))

                    let birthDisc = 0

                    if(dateBirth >= prevDate && dateBirth <= futureDate){
                        birthDisc = 10
                    }
                    else{
                        birthDisc = 0
                    }

                    if(response.data.length >= 1){

                        console.log(prevDate)
                        console.log(futureDate)
                        
                        if(Math.floor(response.data.length / 1) > 15){
                            document.getElementById("discount").innerHTML = 15+birthDisc + "%"
                            setDiscount(...[Math.floor(price - ((price / 100)*(15+birthDisc)))])
                            console.log(discount)
                        }
                        else{
                            document.getElementById("discount").innerHTML = Math.floor(response.data.length / 1)+birthDisc + "%"
                            setDiscount(...[Math.floor(price - ((price / 100)*(Math.floor(response.data.length / 1)+birthDisc)))])
                            console.log(discount)
                        }
                    }
                    else{
                        setDiscount(...[Math.floor(price - (price / 100)*birthDisc)])
                        document.getElementById("discount").innerHTML = birthDisc + "%"
                    }
                })
                .catch(function(response){
                    console.log(response)
                })
            })
            .catch(function(response){
                console.log(response)
            })
    })
    
    return(
        <div id="carOrder" style={{display: "none"}} className="car__order">
            <div className="car__order-inner">
                <img id="carImg" src="img/polovwfullhd.svg" alt="" className="car__order-img" />
                <div className="car__order-information">
                    <span id="price" className="order__price">4200 ₽</span>
                    в сутки
                    <hr style={{marginTop: "10px"}} className="profile__line" />
                    <form onSubmit={handleSubmitOrder}>
                        <div className="order__input">
                            <input min={today} id="datetake" style={{width: "150px"}} type="date" className="date" />
                            <input min={today} id="dateout" onChange={(e) => onChange(e)} style={{width: "150px", borderRight: "1px solid #B5B5B5", background: "url(img/dateout.svg) 6px 4px no-repeat #F5F5F5"}} type="date" className="date" />
                        </div>
                        <div className="count__info">
                            <span id="dayCount" style={{fontWeight: "300"}} className="price__count">₽ 4200 x 1 дней</span>
                            <span id="finallyCoast" style={{fontWeight: "300"}} className="price__count">₽ 4200</span>
                        </div>
                        <div className="count__info">
                            <span style={{fontWeight: "300", textDecorationLine: "underline"}} className="price__count">Сервисный сбор</span>
                            <span id="service_fee" style={{fontWeight: "300"}} className="price__count">₽ 589</span>
                        </div>
                        <div className="count__info bgtext">
                            <span style={{fontWeight: "300"}} className="price__count">Скидка</span>
                            <span id="discount" style={{fontWeight: "300"}} className="price__count">0%</span>
                        </div>
                        <hr style={{margin: "0 auto", width: "303px", marginTop: "13px"}} className="profile__line" />
                        <div className="count__info">
                            <span style={{fontWeight: "300"}} className="price__count">Стоимость поездки</span>
                            <span id="finally" style={{fontWeight: "500"}} className="price__count">₽ 4789</span>
                        </div>
                        <div className="order__button-inner">
                            <div className="order__button-bg"></div>
                            <button onClick={openPopupConf} type="button" className="order__button">Забронировать</button>
                        </div>
                        <div id="confirmation" className="popup">
                            <div className="signup__popup">
                                <a href="/#" onClick={closePopupConf} className="popup__closed"><img src="img/close.svg" alt="" className="popup__closed-img" /></a>
                                <h2 className="signup__text">Подтверждение</h2>
                                <span className="signup__text" style={{textAlign: "center", display: "block"}} id="brandCar"></span>
                                <span id="dateConf" className="confirmation__date-text">14/12/22</span>
                                <span id="priceConf" className="confirmation__date-text">14/12/22</span>
                                <button type="submit" onClick={closePopupConfAccept} className="signup__btn">Забронировать</button>
                            </div>
                        </div>
                    </form>
                    <span style={{fontWeight: "500", fontSize: "14px", textAlign: "center", display: "block", marginTop: "15px"}}>ИЛИ</span>
                    <button className="callme__btn">Позвоните мне</button>
                    <span className="order__warning">С вас пока не будет взиматься плата</span>
                </div>
            </div>
            <h2 id="carBrand" className="order__car-brand">Volkswaven Polo 2020</h2>
            <div style={{height: "50px"}} id="error" className="space"></div>
            <div className="notification">Заказ добавлен!</div>
        </div>
    );
}

export default CarOrder;