import React, { useState } from "react";
import CatalogItem from "./CatalogItem";
import Container from "./Container";
import axios from "axios";


const SearchInput = () => {
    const [value, setValue] = useState();
    function changeValue(event) {
        setValue(event.target.value);
    }
    const [cars, setCars] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.location.value)
        console.log(value)
        axios.post('/api/carssearch', {
            location: event.target.location.value,
            type: value,
        }).then(res => {
            setCars(...[res.data]);
        }, [])
    }
    return(
        <Container>
            <h1 className="top__text">Забронируйте авто по лучшим ценам!</h1>
        <form onSubmit= {handleSubmit} action="">
            <select name="location" id="location" className="location">
                <option value="default">Выберите место получения</option>
                <option value="Россия, Кемерово">Россия, Кемерово</option>
                <option value="Россия, Москва">Россия, Москва</option>
            </select>
            <div className="datearea">
                <input type="date" className="date"/><input type="time" className="time"/><input type="date" className="dateout"/><input type="time" className="time"/>
            </div>
            <h1 className="top__text-type">Выберите тип</h1>
            <div className="auto">
                <div className="auto__type">
                    <input checked={value === 'Седан' ? true : false} onChange={changeValue} type="radio" className="auto__type-input" id="sedan" name="type_auto" value="Седан"/>
                    <label htmlFor="sedan"></label>
                    <h3 className="auto__type-text">Седан</h3>
                    <img src="img/Nissan-PNG-Transparent-Image.svg" alt="" className="auto__car-img"/>
                    <div className="auto__price">от ₽1499 сутки</div>
                </div>
                <div className="auto__type">
                    <input checked={value === 'Премиум' ? true : false} onChange={changeValue} type="radio" className="auto__type-input" id="premium" name="type_auto" value="Премиум"/>
                    <label htmlFor="premium"></label>
                    <h3 className="auto__type-text">Премиум</h3>
                    <img src="img/done_not_check.svg" alt="" className="auto__type-done" id="premium_check"/>
                    <img src="img/premium_car.svg" alt="" className="auto__car-img"/>
                    <div className="auto__price">от ₽2699 сутки</div>
                </div>
                <div className="auto__type">
                    <input checked={value === 'Внедорожник' ? true : false} onChange={changeValue} type="radio" className="auto__type-input" id="hammer" name="type_auto" value="Внедорожник"/>
                    <label htmlFor="hammer"></label>
                    <h3 className="auto__type-text">Внедорожник</h3>
                    <img src="img/hammer_car.svg" alt="" className="auto__car-img"/>
                    <div className="auto__price">от ₽1999 сутки</div>
                </div>
                <div className="auto__type">
                    <input checked={value === 'Купе' ? true : false} onChange={changeValue} type="radio" className="auto__type-input" id="coupe" name="type_auto" value="Купе"/>
                    <label htmlFor="coupe"></label>
                    <h3 className="auto__type-text">Купе</h3>
                    <img src="img/coupe_car.svg" alt="" className="auto__car-img"/>
                    <div className="auto__price">от ₽1799 сутки</div>
                </div>
                <div className="auto__type">
                    <input checked={value === 'Минивэн' ? true : false} onChange={changeValue} type="radio" className="auto__type-input" id="minivan" name="type_auto" value="Минивэн"/>
                    <label htmlFor="minivan"></label>
                    <h3 className="auto__type-text">Минивэн</h3>
                    <img src="img/minivan_car.svg" alt="" className="auto__car-img"/>
                    <div className="auto__price">от ₽4999 сутки</div>
                </div>
                </div>
                <textarea placeholder="Комментарий" name="" id="textareacontent" cols="30" rows="10" className="auto__textarea"></textarea>
                <div className="auto__tel">
                    <select name="tel" id="" className="select__tel">
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+1">🇺🇸 +1</option>
                    </select>
                    <input placeholder="Номер телефона" type="text" className="auto__tel-input"/>
                </div>
                <button type="submit" className="auto__search-btn">Поиск</button>
            </form>
            <div className="catalog">
                <div className="catalog__items">
                    {cars.map((item) => 
                        <CatalogItem item={item} key={item.id} />
                    )}
                </div>
            </div>
        </Container>
    );
}

export default SearchInput;