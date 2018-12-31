import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: '',
      nextQuote: '',
      nextAuthor: ''
    };
    this.nextQuote = this.nextQuote.bind(this);
  }

  nextQuote() {
    const { quotes } = this.state;
    let idx = Math.floor(Math.random() * quotes.length);
    this.setState({
      nextQuote: quotes[idx].quote,
      nextAuthor: quotes[idx].author
    });
  }

  componentDidMount() {
    console.log('component did mount');
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
        <div id="quote-box">
          {this.state.nextQuote ? (
            <div id="text">{this.state.nextQuote}</div>
          ) : (
            <div id="text">"Click Generate for a new quote"</div>
          )}
          {this.state.nextAuthor ? (
            <div id="author">{this.state.nextAuthor}</div>
          ) : (
            <div id="author">-This App</div>
          )}
        </div>
        <button id="new-quote" className="btn" onClick={this.nextQuote}>
          New Quote
        </button>
        <a href="#" id="tweet-quote">
          Tweet-it
        </a>
      </div>
    );
  }
}

export default App;
