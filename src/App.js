import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  fetchQuotes() {
    fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    )
      .then(response => response.json())
      .then(json => this.setState({ quotes: json.quotes, isLoading: false }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <div id="quote-box">
          <div id="text">This is where the quotes will go.</div>
          <div id="author"> Author Name</div>
          <button id="new-quote" className="btn">
            New Quote
          </button>
          <a href="#" id="tweet-quote">
            Tweet-it
          </a>
        </div>
      </div>
    );
  }
}

export default App;
