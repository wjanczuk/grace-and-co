import React from 'react'
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="home-page">
      <h1>Welcome!</h1>
      <div className="home-page-body">
        <div>
          <Link to="/products">
            <span id="homepage-students">All Products</span>
          </Link>
        </div>
      </div>

      <div className="home-page-content">
        <p>
          Cupcake ipsum dolor sit. Amet muffin sweet roll sugar plum. Lemon
          drops sweet icing. Lollipop sugar plum caramels. Tart bear claw
          chocolate candy powder pastry. Halvah dessert tiramisu pudding chupa
          chups danish tart. Lemon drops muffin candy dragée. Donut gingerbread
          jelly-o danish topping gingerbread pastry powder brownie. Jelly beans
          topping cotton candy sesame snaps sweet roll fruitcake sesame snaps
          jelly beans halvah. Chocolate cake tootsie roll candy canes tiramisu
          cupcake marzipan apple pie.
        </p>
      </div>
    </div>
  )
}

export default LandingPage
