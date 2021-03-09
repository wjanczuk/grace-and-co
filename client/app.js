import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <div id="wrapper">
        <header id="header">
          <div className="inner">
            <div className="logo">
              <span className="symbol">
                <img src="/img/logo.jpg" alt="" />
              </span>
              <Link to="/">
                <span className="title">Grace & Co.</span>
              </Link>
            </div>
          </div>
        </header>

        <div id="main">
          <Navbar />
          <Routes />
        </div>
      </div>
    </div>
  )
}

export default App
