import React from "react";
import $ from "jquery";
import axios from "axios";
import Cookies from "js-cookie";

function closePopupSignin(){
    $('#popup_signin').fadeOut(300);
}

const Signin = () => {

    const handleSubmitSignin = (event) => {
        event.preventDefault();
        axios.post('/api/signin', {
            login: event.target.login.value,
            password: event.target.password.value,
        })
        .then(function (response) {
            console.log(response);
            $('.popup').fadeOut(300);
            Cookies.set('user-login', event.target.login.value, {expires: 1, path: '/', sameSite: 'Lax', secure: false});
            let dateBirth = new Date(response.data.date_of_birth)
            let differenceYears = new Date().getFullYear() - (new Date().getFullYear() - dateBirth.getFullYear())
            let currentDate = new Date(new Date().setFullYear(differenceYears))
            let prevDate = new Date(currentDate.setDate(currentDate.getDate()-10))
            let futureDate = new Date(currentDate.setDate(currentDate.getDate()+10*2))
            if(dateBirth >= prevDate && dateBirth <= futureDate){
                Cookies.set('birthday', true, {expires: 1, path: '/', sameSite: 'Lax', secure: false})
            }
            else{
                Cookies.set('birthday', false, {expires: 1, path: '/', sameSite: 'Lax', secure: false})
            }
            window.location.href = '/';
        })
        .catch(function (response) {
            console.log(response);
            if(response.response.data.errors.toString() === '[object Object]'){
                document.getElementById("error_passwordSignin").innerHTML = response.response.data.errors[0].msg;
            } else {
                document.getElementById("error_passwordSignin").innerHTML = response.response.data.errors;
            }
        });
    }


/*     if(Cookies.get('user-login') === undefined){
        console.log(1)
    } */

    return(
        <form action="" onSubmit={handleSubmitSignin}>
            <div id="popup_signin" className="popup">
                <div className="signup__popup">
                    <a href="/#" onClick={closePopupSignin} className="popup__closed"><img src="img/close.svg" alt="" className="popup__closed-img" /></a>
                    <h2 className="signup__text">Авторизация</h2>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/person.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="login" placeholder="Логин" type="text" className="signup__input-inner" />
                    </div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/password.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="password" placeholder="Пароль" type="password" className="signup__input-inner" />
                    </div>
                    <div className="signup__error" id="error_passwordSignin"></div>
                    <button type="submit" className="signup__btn">Войти</button>
                </div>
            </div>
        </form>
    );
}

export default Signin;