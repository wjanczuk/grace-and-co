import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class AllProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: [
        'All',
        'Beaded',
        'Brass',
        'Lucite + Resin',
        'Wood',
        'Leather',
        'Huggies + Ear Cuffs',
        'Stud',
        'Statement'
      ],
      selectedCategory: '',
      productsToShow: null
    }
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
    this.selectProducts = this.selectProducts.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleSelectCategory = option => {
    const selectedCategory = option.value
    this.setState({
      selectedCategory,
      productsToShow: this.selectProducts(option.value)
    })
  }

  selectProducts(category) {
    let products = [].concat(this.props.products)

    if (category === 'All') {
      return products
    } else {
      products = products.filter(product => product.category === category)
    }

    return products
  }

  render() {
    const {categories, selectedCategory, productsToShow} = this.state

    return (
      <div>
        <div>
          <h3>Our Earring Collection</h3>
          <h5>
            "Trust and love are wonderful, but don't forget the earrings."
            —Estée Lauder
          </h5>
        </div>

        <div>
          <Dropdown
            options={categories}
            onChange={this.handleSelectCategory}
            value={selectedCategory}
            placeholder="Categories"
          />
        </div>

        <br />

        <section className="tiles">
          {(productsToShow ? productsToShow : this.props.products).map(
            product => (
              <article className="style1" key={product.id}>
                <span className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </span>
                <Link to={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                  <div className="content">${product.price.toFixed(2)}</div>
                </Link>
              </article>
            )
          )}
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
