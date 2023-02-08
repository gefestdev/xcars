import React, { useEffect, useState } from "react";
import Container from "./Container";
import axios from "axios";
import CatalogItem from "./CatalogItem";

const Catalog = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        // Do mount stuff here such as executing your request.
        axios.get('/api/carscatalog').then(res => {
            setItems(...[res.data]);
        }, [])
    }, [setItems]);
    
    return(
        <Container>
            <div className="catalog">
                <h1 id="settest" className="catalog__top-text">Каталог</h1>
                <div className="catalog__items">
                    {items.map((item) => 
                        <CatalogItem item={item} key={item.id} />
                    )}
                </div>
                <button className="catalog__button">Показать ещё</button>
            </div>
        </Container>
    );
}

export default Catalog;