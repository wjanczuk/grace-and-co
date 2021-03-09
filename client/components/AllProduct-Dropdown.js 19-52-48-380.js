import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default class DropdownMenu extends React.Component {
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
      selectedCategory: ''
    }
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
  }

  handleSelectCategory = option => {
    const selectedCategory = option.value
    this.setState({selectedCategory})
  }

  render() {
    const {categories, selectedCategory} = this.state

    return (
      <Dropdown
        options={categories}
        onChange={this.handleSelectCategory}
        value={selectedCategory}
        placeholder="Category"
      />
    )
  }
}
