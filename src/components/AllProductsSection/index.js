import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const loading = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: '',
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    rating: '',
    titleSearch: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: loading.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {activeOptionId, category, rating, titleSearch} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: loading.success,
      })
    } else {
      this.setState({isLoading: loading.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  changeCategory = category => {
    console.log(category)
    this.setState({category}, this.getProducts)
  }

  changeRating = rating => {
    console.log(rating)

    this.setState({rating}, this.getProducts)
  }

  changeTitleSearch = titleSearch => {
    this.setState({titleSearch}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        productsList: [],
        isLoading: '',
        activeOptionId: sortbyOptions[0].optionId,
        category: '',
        rating: '',
        titleSearch: '',
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    if (productsList.length === 0) {
      return (
        <div className="no-products-container">
          <img
            className="no-products-img"
            alt="no products"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-para">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="no-products-container">
      <img
        className="no-products-img"
        alt="products failure"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
      />
      <h1 className="no-products-heading">Oops! Something Went Wrong</h1>
      <p className="no-products-para">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  apiResult = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case loading.success:
        return this.renderProductsList()
      case loading.loading:
        return this.renderLoader()
      case loading.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {rating, category, titleSearch} = this.state
    return (
      <div className="all-products-section">
        <FiltersGroup
          clearFilters={this.clearFilters}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          changeTitleSearch={this.changeTitleSearch}
          rating={rating}
          category={category}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          titleSearch={titleSearch}
        />
        {this.apiResult()}
      </div>
    )
  }
}

export default AllProductsSection
