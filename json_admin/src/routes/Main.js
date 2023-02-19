import React, { Component, Fragment } from 'react'

class Main extends Component {
  render() {
    const currYear =  new Date().getFullYear()
    return (
        <Fragment>
            <div className='headerWrapper row'>
                <div className='logoWrapper'>{/*logo*/}</div>
            </div>
            <div className='bodyWrapper row'>
                <div className='col-sm-12 col-xs-12'>
                    <div className='logoWrapper'>Nav</div>
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

export default Main