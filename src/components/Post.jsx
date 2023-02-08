import React from "react";
import axios from "axios";

class Post extends React.Component {
    handleSubmit = (event) =>{
        event.preventDefault();
        axios.post("/signup", {
            login: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value
        })
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    render(){
        return(
            <form onSubmit={this.handleSubmit} action="">
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button value="Submit" type="submit">POST</button>
            </form>
        );
    };
}

export default Post;