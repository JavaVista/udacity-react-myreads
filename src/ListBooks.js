import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { books } = this.props

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
            <Bookshelf title='Currently Reading' books={currentlyReading}  />
            <Bookshelf title='Want to Read' books={wantToRead} />
            <Bookshelf title='Read' books={read} />
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks

ListBooks.propTypes = {
  books: PropTypes.array.isRequired
}
