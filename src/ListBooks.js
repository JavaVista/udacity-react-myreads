import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeBookself: PropTypes.func.isRequired
  }

  render() {
    const { books, changeBookself } = this.props

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading")
    const wantToRead = books.filter((book) => book.shelf === "wantToRead")
    const read = books.filter((book) => book.shelf === "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title='Currently Reading' books={currentlyReading} changeBookself={changeBookself}  />
            <Bookshelf title='Want to Read' books={wantToRead} changeBookself={changeBookself} />
            <Bookshelf title='Read' books={read} changeBookself={changeBookself} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  changeBookself: PropTypes.func.isRequired
}
