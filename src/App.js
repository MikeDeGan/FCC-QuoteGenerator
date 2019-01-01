import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: '', // quotes will store the array of quotes from the api
      nextQuote: '', // nextQuote is the currently displayed quote
      nextAuthor: '' // currently displayed author (maybe should have been named currentAuthor)
    };
    this.nextQuote = this.nextQuote.bind(this);
  }

  nextQuote() {
    // nextQuote will pick a random quote from quotes and store it in nextQuote and nextAuthor
    const { quotes } = this.state;

    let idx = Math.floor(Math.random() * quotes.length);

    this.setState({
      nextQuote: quotes[idx].quote,
      nextAuthor: quotes[idx].author
    });
  }

  componentDidMount() {
    // grab a bunch of quotes, parse and store in state. Run nextQuote to load the first quote.
    fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ quotes: json.quotes });
        this.nextQuote();
      })
      .catch(error => console.log('error: ', error));
  }

  render() {
    return (
      <div className="App">
        <div>
          <img
            src="https://images.pexels.com/photos/735812/pexels-photo-735812.jpeg"
            alt="background blur"
          />
        </div>

        <div id="quote-box">
          <button
            id="new-quote"
            className="btn btn-outline-light"
            onClick={this.nextQuote}
          >
            New Quote
          </button>
          <div id="text">"{this.state.nextQuote}"</div>
          <div id="author">- {this.state.nextAuthor}</div>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              this.state.nextQuote
            )}%20%20-%20${encodeURIComponent(this.state.nextAuthor)}`}
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            <i className="fab fa-twitter fa-2x" />
            Tweet-it
          </a>
        </div>
      </div>
    );
  }
}

export default App;
