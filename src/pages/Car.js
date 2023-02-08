import CarOrder from "../components/CarOrder";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";


function Car(){
    return(
        <div className="car__page">
            <Header />
            <Container>
                <CarOrder />
            </Container>
            <Footer />
        </div>
    );
}

export default Car;