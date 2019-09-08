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
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(
    function(response) {
      console.log(response.rawData.outputs[0].data.regions[0].region_info.bounding_box);
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
  
}

export default App;
