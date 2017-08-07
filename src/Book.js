import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {

    const { book } = this.props
    // const options = [
    //   {value: 'currentlyReading', title: 'Currently Reading'},
    //   {value: 'wantToRead', title: 'Want to Read'},
    //   {value: 'read', title: 'Read'},
    //   {value: 'none', title: 'None'}
    // ]

    return (
      <div key={book.id} className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => {}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(', ')}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book
