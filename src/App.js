import data from './unicode.json'
import React, { Component } from 'react'
import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        {data.map((item, idx) => {
          return (
            <div 
              className="char"
              key={idx}
            >
              <div
                className="symbol"
                dangerouslySetInnerHTML={{__html: '&#x' + item.code}} 
              />
              <div className="name">
                {item.name}
              </div>

            </div>
          )
        })
        }
      </div>
    )
  }
}

export default App;
