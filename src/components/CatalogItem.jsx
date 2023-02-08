import React from "react";
import { Link } from "react-router-dom";

const CatalogItem = ({item}) => {
    return(
        <Link to={"/car?id="+item.id} className="catalog__items-inner">
            <img src={item.image} alt="" className="catalog__items-img"/>
            <h3 className="catalog__car-text">{item.brand}</h3>
            <div className="catalog__location">
                <img src="img/location_on.svg" alt="" className="catalog__location-img"/>
                <h3 className="catalog__location-text">{item.location}</h3>
            </div>
            <div className="catalog__price">
                <span className="catalog__price-text">{item.price} ₽</span>
                в сутки
            </div>
        </Link>
    );
}

export default CatalogItem;