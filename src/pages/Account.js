import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import Cookies from "js-cookie";
import OrderHistory from "../components/OrderHistory";
import axios from "axios";
import { useEffect, useState } from "react";


function Account() {

    const [orders, setOrders] = useState([])

    if(Cookies.get('user-login') === undefined){
        alert("Вы не авторизовались")
        window.location.href = '/';
    }
    useEffect(() => {
        axios.post('/api/getuser', {
            login: Cookies.get('user-login')
        })
        .then(function(response){
            axios.post('/api/getorder', {
                id_user: response.data.id
            })
            .then(function(response){
                setOrders(...[response.data])
            })
        })
    }, [setOrders]);

    return(
        <div className="account">
            <Header />
            <Container>
                <ProfileCard />
                <h3 className="history__top-text">История заказов</h3>
                {orders.map((order) => 
                    <OrderHistory order={order} key={order.id}/>
                )}
                <button className="catalog__button">Показать еще</button>
            </Container>
            <Footer />
        </div>
    );
}

export default Account;