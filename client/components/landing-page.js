import React from 'react'
import UserHome from './user-home'

const LandingPage = props => {
  return (
    <div className="home-page">
      {props.isLoggedIn ? (
        <UserHome />
      ) : (
        <h1>
          <i>Grace Yourself with Beautifully Crafted & Elegant Designs</i>
        </h1>
      )}

      <div className="home-page-content">
        <p>
          Founded in 2021 by Michelle Dacal, Victoria Ho, Weronika Janczuk, and
          Kay XiongPachay, four developers at the Grace Hopper Program at
          Fullstack Academy, Grace & Co. is an all-around earring store for
          women. From classic shapes to creative twists, our impeccably crafted
          collection of earrings invites you to make your own rules. Explore
          stud earrings, hoops, and more.
        </p>
      </div>
    </div>
  )
}

export default LandingPage
