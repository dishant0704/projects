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
    const currYear =  new Date().getFullYear()
    return (
      <div className="container pageWrapper">
        <div className='headerWrapper row'>
                <div className='logoWrapper'>{/*logo*/}</div>
            </div>
            <div className='bodyWrapper row'>
                <div className='col-sm-12 col-xs-12'>
                  {
                  this.state.isAuthFlag ?
                    <Main />
                :
                    <Auth />
                  }
                </div>
            </div>
            <div className='footerWrapper row'>
                <div className='col-sm-12 col-xs-12'>
                    @{currYear} ketandutt@gmail.com.
                </div>                
            </div> 
      </div>
    )
  }
}

export default App