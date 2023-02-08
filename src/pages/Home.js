import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import Preview from "../components/Preview";
import Catalog from "../components/Catalog";
import Footer from "../components/Footer";
import Popups from "../components/Popups";




function Home(){
    return(
        <div>
            <Header />
            <SearchInput />
            <Preview />
            <Catalog />
            <Footer />
            <Popups />
        </div>
    );
}

export default Home;