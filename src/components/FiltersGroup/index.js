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

  clearFilter = () => {
    const {clearFilters} = this.props
    this.setState({search: ''})
    clearFilters()
  }

  renderCategories = each => {
    const {changeCategory, category} = this.props

    const onCategory = () => {
      changeCategory(each.categoryId)
    }

    return (
      <p
        onClick={onCategory}
        type="button"
        className={
          category === each.categoryId
            ? 'selected-category-button'
            : 'category-button'
        }
        key={each.name}
      >
        {each.name}
      </p>
    )
  }

  renderRatings = each => {
    const {changeRating, rating} = this.props

    const onRating = () => {
      changeRating(each.ratingId)
    }
    return (
      <p
        onClick={onRating}
        type="button"
        className={
          rating === each.ratingId ? 'selected-rating-button' : 'rating-button'
        }
        value={each.ratingId}
        key={each.imageUrl}
      >
        <img
          className="rating-img"
          alt={`rating ${each.ratingId}`}
          src={each.imageUrl}
        />
        & up
      </p>
    )
  }

  render() {
    const {search} = this.state
    const {categoryOptions, ratingsList} = this.props

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
          {categoryOptions.map(each => this.renderCategories(each))}
        </div>
        <div className="ratings-container">
          <h1 className="category-heading">Rating</h1>
          {ratingsList.map(each => this.renderRatings(each))}
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
