import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
* TODO: Make the details page more visually appealing.
* TODO: Update Average Review to use icons.
* BUG: The shelf select does not update although the App state does.
*/

class BookDetails extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    getBook: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.resetBook();
  }

  render() {
    const { book, onShelfChange, match, getBook } = this.props
    const shelf = book.shelf ? book.shelf : 'none'

    if (book.id !== match.params.id) {
      getBook(match.params.id);
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <a className="close-details" href="#" onClick={()=> (history.back())}>Close</a>
          <h1>MyReads</h1>
        </div>
        <div key={book.id} className="book-details">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}>
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


          <div className="book-top">
              <h2 className="book-title">{book.title}</h2>
              <h3 className="book-pub">{book.printType} - {book.publishedDate}</h3>
              <h4 className="book-authors">by {Array.isArray(book.authors) && book.authors.join(', ')}</h4>
              <div className="book-stats">
                <h4>Details</h4>
                <p><strong>Page Count:</strong> {book.pageCount} pages</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                {book.industryIdentifiers.map((i) => (
                  <p key={i.type}><strong>{i.type}:</strong> {i.identifier}</p>
                ))}
                <p><strong>Average Review:</strong> {book.averageRating} ({book.ratingsCount} reviews)</p>
              </div>
              <div className="book-description">
                <h4>Description</h4>
                <p>{book.description}</p>
              </div>
          </div>

        </div>
      </div>
    )
  }
}

BookDetails.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired
}

export default BookDetails
