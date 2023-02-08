import React from "react";

const OrderHistory = ({order}) => {
    
    var ordersDateStart = new Date(order.date_start);
    var dd = String(ordersDateStart.getDate()).padStart(2, '0');
    var mm = String(ordersDateStart.getMonth() + 1).padStart(2, '0');
    var yyyy = ordersDateStart.getFullYear();
    ordersDateStart = dd + '/' + mm + '/' + yyyy;

    var ordersDateEnd = new Date(order.date_end);
    var ddEnd = String(ordersDateEnd.getDate()).padStart(2, '0');
    var mmEnd = String(ordersDateEnd.getMonth() + 1).padStart(2, '0');
    var yyyyEnd = ordersDateEnd.getFullYear();
    ordersDateEnd = ddEnd + '/' + mmEnd + '/' + yyyyEnd;

    function getNumberOfDays(start, end) {
        const date1 = new Date(start);
        const date2 = new Date(end);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        return diffInDays;
    }

    return(
        <div className="history">
            <div className="history__inner">
                <div style={{marginTop: "15px", marginLeft: "30px"}} className="activecar__inner">
                    <img src={order.Cars[0].image} alt="" className="activecar__inner-img" />
                    <div className="activecar__information">
                        <h2 className="activecar__information-text">{order.Cars[0].brand}</h2>
                        <div style={{margin: "0"}} className="catalog__location">
                            <img src="img/location_on.svg" alt="" className="catalog__location-img" />
                            <h3 className="catalog__location-text">{order.Cars[0].location}</h3>
                        </div>
                        <div style={{margin: "0"}} className="catalog__location">
                            <img src="img/today.svg" alt="" className="catalog__location-img" />
                            <h3 style={{color: "#65C6BB"}} className="catalog__location-text">{ordersDateStart}</h3>
                        </div>
                        <div style={{margin: "0"}} className="catalog__location">
                            <img src="img/event.svg" alt="" className="catalog__location-img" />
                            <h3 style={{color: "#65C6BB"}} className="catalog__location-text">{ordersDateEnd}</h3>
                        </div>
                    </div>
                    <div className="activecar__information">
                        <h2 className="activecar__information-text">Аренда продлилась:</h2>
                        <div className="activecar__information-time">{getNumberOfDays(order.date_start, order.date_end)} дней</div>
                    </div>
                    <div className="history__status">
                        Статус:
                        <span className="history__status-text">Без опозданий</span>
                    </div>
                </div>
                <div style={{margin: "0", position:"absolute", marginLeft: "923px", marginTop: "93px"}} className="catalog__price">
                    <span className="catalog__price-text">{order.price} ₽</span>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;