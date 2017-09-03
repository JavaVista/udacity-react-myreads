import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeBookself: PropTypes.func.isRequired
  }

  render() {
    const { title, books, changeBookself } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) =>
              <li key={book.id}>
                <Book book={book} onShelfChange={changeBookself} />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeBookself: PropTypes.func.isRequired
}

export default Bookshelf
