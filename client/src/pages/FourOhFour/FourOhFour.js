import React, { Component} from "react";
import "./FourOhFour.css";

class FourOhFour extends Component {
    render(){
        return (
            <div class="container">
                <div class="row">
                    <img src="./images/coffeebrokenNEW.png" alt="404" id="imgStyle" />
                </div>	
                
                <div class="row" id="fontStyle">
                    oops!
                </div>
                
                <div class="row" id="fontStyle3">
                    <h2>you broke the internet!</h2>
                </div>
                    
                <div class="row">
                    <a href="/"><button>home</button></a>
                </div>
            </div>
        );
    }
}

export default FourOhFour;