import React from "react";
import BirthdayPopup from "./BirthdayPopup";
import Signin from "./Signin";
import Signup from "./Signup";

const Popups = () => {
    return(
        <div>
            <Signup />
            <Signin />
            <BirthdayPopup />
        </div>
    );
}

export default Popups;