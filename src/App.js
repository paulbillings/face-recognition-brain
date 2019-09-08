import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Clarifai from 'clarifai';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
} 

const app = new Clarifai.App({
 apiKey: '60aee873e4f14469a32c2771e1dd7e0a'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log("click");
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg")
    .then(
    function(response) {
      console.log(response);
    },
    function(err) {
      console.log(err);
    }
  );
  }

  render() {
      return (
      <div className="App">
        <Particles className="particles"
            params={particlesOptions}
         />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition />
      </div>
    );
  }
  
}

export default App;
