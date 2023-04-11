//ISSUE: WHEN ANOTHER USER LOGINS, ARTIFACTS FROM THE PREVIOUS USER REMAIN
//I ATTEMPTED TO FIX THIS WITH REFRESHUSER AND INITIALSTATE BUT STILL DOES NOT WORK


import React, {Component} from 'react';         //THIS WORKS
import './App.css';                             //THIS WORKS
import ParticlesBg from 'particles-bg';         //THIS WORKS
import Logo from './Components/Logo/Logo';       //THIS WORKS
import Navigation from './Components/Navigation/Navigation';  //THIS WORKS
import Signin from './Components/Signin/Signin';              //THIS WORKS
import Register from './Components/Register/Register';        //THIS WORKS
import URLinput from './Components/URLinput/URLinput';        //THIS WORKS
import Rank from './Components/Rank/Rank';        //THIS WORKS
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';   //THIS WORKS
import 'tachyons';                                //THIS WORKS

//THIS WORKS

const initialState = {

      input: '',                              //THIS WORKS
      imageUrl: '',                              //THIS WORKS
      box: {},                       //THIS WORKS
      route: 'signin',                           //THIS WORKS

      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {                 //THIS WORKS
  constructor() {                             //THIS WORKS
    super();                                  //THIS WORKS
     this.state = initialState;
  }

  // componentDidMount() {                 //THIS IS NEW AND IT WORKS
  //   fetch('http://localhost:3001/')
  //     .then(response => response.json())
  //     .then(data => console.log('compdidmount', data))
  // }

  loadUser = (data) => {      //THIS IS NEW
    console.log('data is', data)    //THIS ISNT GOING TO WORK BC DATA IS "SUCCESS"
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  refreshUser = () => {
    return this.setState(initialState)
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    console.log('oninputchange', event.target.value); //this works realtime
    this.setState({input: event.target.value})  //THIS WORKS
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); //THIS WORKS
    console.log('onbutton', this.state.input)
              fetch('http://localhost:3001/imageurl', {
                method: 'post',                           //ZTM SAYS PUT BUT I GET CANNOT PUT ERROR
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  input: this.state.input
                })
              })  
              .then(response => response.json())



          .then(response => {
            this.displayFaceBox(this.calculateFaceLocation(response));
            if(response) {
              fetch('http://localhost:3001/image', {
                method: 'put',                           //ZTM SAYS PUT BUT I GET CANNOT PUT ERROR
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count => {
                console.log('count is', count)
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
            }
          })
          .catch((error) => console.log(error))
  }

  onRouteChange = (route) => {
    console.log('func route', route)  
    this.setState({route: route})
  }


  render() {
    let componentToRender;
    console.log('act route', this.state.route)
    switch(this.state.route) {
    case 'home': componentToRender = (
        <div>
          <Rank userName={this.state.user.name} userEntries={this.state.user.entries} />
          <URLinput onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/> 
        </div>
      );
      break;
    case 'signin': componentToRender = (
        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
      )
      break;
    case 'signout': componentToRender = (
        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} refresh={this.refreshUser} />
      )
      break;
    case 'register': componentToRender = (
        <Register onRouteChange={this.onRouteChange} />
      )
      break;
    default: componentToRender = (
        <div>404</div>
      )
    }

    return (
      <div className="App">
        <ParticlesBg type="cobweb" color="#ffffff" bg={{position: "fixed", left: 0, top: 0}} className="particles-bg"/>
        <Navigation onRouteChange={this.onRouteChange} route={this.state.route} />
        { componentToRender }
      </div>
    );
  }





}



//const IMAGE_URL = 'https://samples.clarifai.com/face-det.jpg'


export default App;
