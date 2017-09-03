import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { book, onShelfChange } = this.props
    const shelf = book.shelf ? book.shelf : 'none'

    return (
      <div key={book.id} className="book">
        <div className="book-top">
          <Link to={`/details/${book.id}`}>
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          </Link>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(e) => {onShelfChange(book, e.target.value)}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{Array.isArray(book.authors) && book.authors.join(', ')}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default Book
