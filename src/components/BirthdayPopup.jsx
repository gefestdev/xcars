import React from "react";
import $ from 'jquery'
import Cookies from "js-cookie";

const BirthdayPopup = () => {
    function closePopupBirthday(){
        $('#popup_birthday').fadeOut(300)
        Cookies.set('birthday', false, {expires: 1, path: '/', sameSite: 'Lax', secure: false})
    }
    $(document).ready(function(){
        if(Cookies.get('birthday') === "true"){
            $('#popup_birthday').fadeIn(300)
        }
    })
    return(
        <div style={{background: 'transparent'}} id="popup_birthday" className="popup">
            <div className="birthday">
                <div className="birthday__inner">
                    <img src="img/cake_green.svg" alt="" className="birthday__cake" />
                    <p className="birthday__text">
                    Поздравляем Вас с Днем Рождения! В подарок от нас предлагаем скидку в 10% на каждый товар.
                    </p>
                </div>
                <button onClick={closePopupBirthday} style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/cake_btn.svg'}`, backgroundPosition: '12px 11px'}} className="signup__btn">Спасибо!</button>
            </div>
        </div>
        
    );
}

export default BirthdayPopup;