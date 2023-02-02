import {Component} from 'react'

import './index.css'

import {BiSearch} from 'react-icons/bi'

class FiltersGroup extends Component {
  state = {search: ''}

  updateSearch = event => {
    this.setState({search: event.target.value})
  }

  changeSearch = event => {
    const {changeTitleSearch} = this.props
    if (event.key === 'Enter') {
      changeTitleSearch(event.target.value)
    }
  }

  onCategory = event => {
    const {changeCategory} = this.props
    changeCategory(event.target.value)
  }

  onRating = event => {
    const {changeRating} = this.props
    changeRating(event.target.value)
  }

  clearFilter = () => {
    const {clearFilters} = this.props
    this.setState({search: ''})
    clearFilters()
  }

  renderCategories = () => {
    const {categoryOptions, category} = this.props

    return categoryOptions.map(each => (
      <button
        onClick={this.onCategory}
        type="button"
        className={
          category === each.categoryId
            ? 'selected-category-button'
            : 'category-button'
        }
        key={each.name}
      >
        <p>{each.name}</p>
      </button>
    ))
  }

  renderRatings = () => {
    const {ratingsList, rating} = this.props
    return ratingsList.map(each => (
      <p
        onClick={this.onRating}
        type="button"
        className={
          rating === each.ratingId ? 'selected-rating-button' : 'rating-button'
        }
        value={each.ratingId}
        key={each.imageUrl}
      >
        <img className="rating-img" alt={each.id} src={each.imageUrl} />& up
      </p>
    ))
  }

  render() {
    const {search} = this.state

    return (
      <div className="filters-group-container">
        <div className="filter-input-container">
          <input
            className="filter-search"
            type="search"
            onChange={this.updateSearch}
            onKeyDown={this.changeSearch}
            placeholder="Search"
            value={search}
          />
          <BiSearch className="search-icon" />
        </div>
        <div className="category-container">
          <h1 className="category-heading">Category</h1>
          {this.renderCategories()}
        </div>
        <div className="ratings-container">
          <h1 className="category-heading">Rating</h1>
          {this.renderRatings()}
        </div>
        <button
          className="clear-filter-button"
          type="button"
          onClick={this.clearFilter}
        >
          Clear Filters
        </button>
      </div>
    )
  }
}

export default FiltersGroup
