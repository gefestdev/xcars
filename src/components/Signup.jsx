import React from "react";
import $  from "jquery";
import axios from "axios";

const Signup = () => {

    function closePopupSignup(){
        $('#popup_signup').fadeOut(300);
    }

    function openPopupSignin(){
        $('#popup_signin').fadeIn(0);
        $('#popup_signup').fadeOut(0);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.password.value !== event.target.password_repeat.value){
            document.getElementById("error_password").innerHTML = "Пароли не совпадают";
            document.getElementById("error_passwordRepeat").innerHTML = "Пароли не совпадают";

        }
        else{
            document.getElementById("error_password").innerHTML = "";
            document.getElementById("error_passwordRepeat").innerHTML = "";
            axios.post('/api/signup', {
                login: event.target.login.value,
                password: event.target.password.value,
                name: event.target.name.value,
                lastname: event.target.lastname.value,
                patronymic: event.target.patronymic.value,
                phone_number: event.target.phone_number.value,
                date_of_birth: event.target.date_of_birth.value,
                role: "User"
            })
            .then(function (response) {
                console.log(response);
                $('.popup').fadeOut(300);
                $('.notification').fadeIn(300)
                setTimeout(function() {
                    $('.notification').fadeOut(300)
                }, 5000);
                
            })
            .catch(function (response) {
                console.log(response);
                document.getElementById("error_phone").innerHTML = response.response.data.errors;
            });
        }
    }
    
    return(
        <form onSubmit={handleSubmit} action="">
            <div id="popup_signup" className="popup">
                <div className="signup__popup">
                    <a href="/#" onClick={closePopupSignup} className="popup__closed"><img src="img/close.svg" alt="" className="popup__closed-img" /></a>
                    <h2 className="signup__text">Регистрация</h2>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/person.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="login" placeholder="Логин" type="text" className="signup__input-inner" />
                    </div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/person.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="name" placeholder="Имя" type="text" className="signup__input-inner" />
                    </div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/person.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="lastname" placeholder="Фамилия" type="text" className="signup__input-inner" />
                    </div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/person.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="patronymic" placeholder="Отчество" type="text" className="signup__input-inner" />
                    </div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/cake.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input style={{fontSize: '14px'}} id="date_of_birth" placeholder="Дата рождения" type="date" className="signup__input-inner" />
                    </div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/password.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="password" placeholder="Пароль" type="password" className="signup__input-inner" />
                    </div>
                    <div className="signup__error" id="error_password"></div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/password.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="password_repeat" placeholder="Повторите пароль" type="password" className="signup__input-inner" />
                    </div>
                    <div className="signup__error" id="error_passwordRepeat"></div>
                    <div className="signup__input">
                        <div className="signup__icon-input">
                            <img src="img/phone_iphone.svg" alt="" className="signup__icon-img" />
                        </div>
                        <input id="phone_number" placeholder="Номер телефона" type="text" className="signup__input-inner" />
                    </div>
                    <a href="/#" onClick={openPopupSignin} id="signin_link" className="signin__link">Вы уже зарегистрированы? Тогда войдите.</a>
                    <div className="signup__error" id="error_phone"></div>
                    <button type="submit" className="signup__btn">Зарегистрироваться</button>
                </div>
            </div>
            <div className="notification">Регистрация прошла успешно</div>
        </form>
    );
}

export default Signup;