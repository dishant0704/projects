import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Main from './routes/Main';
import Auth from './routes/Auth';

export class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      isAuthFlag: false
    }
  }

  render() {
    return (
      <div className="container pageWrapper">
        {
        this.state.isAuthFlag ?
            <Main />
       :
          <Auth />
        }
      </div>
    )
  }
}

export default App