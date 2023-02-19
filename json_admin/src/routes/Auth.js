import React, { Component, Fragment } from 'react'
import SignIn from './SignIn'

class Auth extends Component {
  render() {
    const currYear =  new Date().getFullYear()
    return (
        <Fragment>
            <div className='headerWrapper row'>
                <div className='logoWrapper'>{/*logo*/}</div>
            </div>
            <div className='bodyWrapper row'>
                <div className='col-sm-12 col-xs-12'>
                   Login form:
                   <SignIn />
                </div>
            </div>
            <div className='footerWrapper row'>
                <div className='col-sm-12 col-xs-12'>
                    @{currYear} ketandutt@gmail.com.
                </div>                
            </div> 
        </Fragment>
    )
  }
}

export default Auth