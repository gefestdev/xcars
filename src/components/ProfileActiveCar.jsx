import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProfileActiveCar = () => {

    

        axios.post('/api/getuser', {
            login: Cookies.get('user-login')
        })
        .then(function(response){
            axios.post('/api/getactiveorder', {
                id_user: response.data.id
            })
            .then(function(response){
                var ordersDateStart = new Date(response.data.date_start);
                var dd = String(ordersDateStart.getDate()).padStart(2, '0');
                var mm = String(ordersDateStart.getMonth() + 1).padStart(2, '0');
                var yyyy = ordersDateStart.getFullYear();
                ordersDateStart = dd + '/' + mm + '/' + yyyy;

                var ordersDateEnd = new Date(response.data.date_end);
                var ddEnd = String(ordersDateEnd.getDate()).padStart(2, '0');
                var mmEnd = String(ordersDateEnd.getMonth() + 1).padStart(2, '0');
                var yyyyEnd = ordersDateEnd.getFullYear();
                ordersDateEnd = ddEnd + '/' + mmEnd + '/' + yyyyEnd;

                let today = new Date()
                function getNumberOfDays(start, end) {
                    const date1 = new Date(start);
                    const date2 = new Date(end);
                    const oneDay = 1000 * 60 * 60 * 24;
                    const oneHour = 1000 * 60 * 60;
                    const oneMinute = 1000 * 60;
                    const diffInTime = date2.getTime() - date1.getTime();
                    const diffInDays = Math.round(diffInTime / oneDay);
                    const Hours = diffInDays * 24;
                    const diffInHours = Math.floor(Hours + (diffInTime / oneHour)); //ВОЗМОЖНО ОШИБКА, РАЗОБРАТЬСЯ!!! идет синхрон с часовым поясом GMT +7 на конечной дате
                    console.log(date1)
                    console.log(date2)
                    const diffInMinutes = Math.round((diffInTime / oneMinute) - (Math.floor((diffInTime / oneHour)))*60);
                    return diffInDays + ' дней ' + diffInHours + ' часов ' + diffInMinutes + ' минут';
                }

                document.getElementById('brandCar').innerHTML = response.data.Cars[0].brand
                document.getElementById('carImg').src = response.data.Cars[0].image
                document.getElementById('location').innerHTML = response.data.Cars[0].location
                document.getElementById('date_start').innerHTML = ordersDateStart
                document.getElementById('date_end').innerHTML = ordersDateEnd
                document.getElementById('price').innerHTML = response.data.price + " ₽"
                document.getElementById('timestamp').innerHTML = getNumberOfDays(today, response.data.date_end)
            })
            .catch(function(error){
                document.getElementById('activecar').style.display = 'none';
                document.getElementById('error').style.display = 'block';
                document.getElementById('error').style.paddingBottom = '78px';
            })
        })
        .catch(function(error){
            console.log(error)
        })

    return(
        <div className="activecar">
            <span className="activecar__text">Активный автомобиль</span>
            <hr className="profile__line" />
            <div id="activecar" className="activecar__inner">
                <img id="carImg" src="img/polovw.svg" alt="" className="activecar__inner-img" />
                <div className="activecar__information">
                    <h2 id="brandCar" className="activecar__information-text">Volkswaven Polo 2020</h2>
                    <div style={{margin: "0"}} className="catalog__location">
                        <img src="img/location_on.svg" alt="" className="catalog__location-img" />
                        <h3 id="location" className="catalog__location-text">Россия, Москва</h3>
                    </div>
                    <div style={{margin: "0"}} className="catalog__location">
                        <img src="img/today.svg" alt="" className="catalog__location-img" />
                        <h3 id="date_start" style={{color: "#65C6BB"}} className="catalog__location-text">14.11.2022</h3>
                    </div>
                    <div style={{margin: "0"}} className="catalog__location">
                        <img src="img/event.svg" alt="" className="catalog__location-img" />
                        <h3 id="date_end" style={{color: "#65C6BB"}} className="catalog__location-text">17.11.2022</h3>
                    </div>
                    <div style={{margin: "0"}} className="catalog__price">
                        <span id="price" className="catalog__price-text">4589 ₽</span>
                    </div>
                </div>
                <div className="activecar__information">
                    <h2 className="activecar__information-text">До конца аренды:</h2>
                    <div id="timestamp" className="activecar__information-time">2 дня 12 часов 32 минуты</div>
                </div>
            </div>
            <span id="error" style={{textAlign: 'center', display: 'none'}} className="history__top-text">Заказов не найдено</span>
            <hr id="bottomHr" style={{marginTop: "48px"}} className="profile__line" />
        </div>
    );
}

export default ProfileActiveCar;