import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import $ from "jquery";
import ProfileActiveCar from "./ProfileActiveCar";

const ProfileCard = () => {

    $(document).ready(function(){
        axios.post('/api/getuser', {
            login: Cookies.get('user-login')
        })
        .then(function(response){
            document.getElementById('userPhone').innerHTML = response.data.phone_number
            document.getElementById('userID').innerHTML = response.data.id
            document.getElementById('profileName').innerHTML = response.data.name
            document.getElementById('profileLastname').innerHTML = response.data.lastname
            document.getElementById('profilePatronymic').innerHTML = response.data.patronymic
            $('#profile').fadeIn(500)
        })
        .catch(function(response){
            alert("Произошла какая-то ошибка, перезайдите")
            Cookies.remove('user-login')
            window.location.href = "/";
        })
    });

    return(
        <div id="profile" className="profile" style={{display: "none"}}>
            <div className="profile__inner">
                <hr className="profile__line" />
                <div className="profile__information">
                    <img src="img/rabbitprofile.svg" alt="" className="profile__avatar" />
                    <div className="profile__information-inner">
                        <h2 id="profileLastname" className="profile__name-text lastname">Фамилия</h2>
                        <h2 id="profileName" className="profile__name-text">Имя</h2>
                        <h2 id="profilePatronymic" className="profile__name-text">Отчество</h2>
                        <div className="profile__phone">
                            <img src="img/ru_flag.svg" alt="" className="profile__phone-img" />
                            <h2 id="userPhone" style={{fontWeight: "300", marginTop: "6px"}} className="profile__name-text">0</h2>
                        </div>
                    </div>
                </div>
                <hr className="profile__line" />
                <span id="userID" className="profile__id-text"></span>
            </div>
            <ProfileActiveCar />
        </div>
    );
}

export default ProfileCard;