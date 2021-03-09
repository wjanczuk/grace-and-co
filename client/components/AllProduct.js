import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'

class AllProduct extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div>
        <div>
          <h3>Our Earring Collection</h3>
          <h5>
            "Trust and love are wonderful, but don't forget the earrings."
            —Estée Lauder
          </h5>
        </div>

        <section className="tiles">
          {this.props.products.map(product => (
            <article className="style1" key={product.id}>
              <span className="image">
                <img src={product.imageUrl} alt={product.name} />
              </span>
              <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                <div className="content">${product.price.toFixed(2)}</div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.all
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProduct)
