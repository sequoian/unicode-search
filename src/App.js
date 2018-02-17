import data from './unicode.json'
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chars: data,
      filter: ''
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const {chars, filter} = this.state
    const display = chars.filter(item => {
      if (item.name.toLowerCase().indexOf(filter) > -1) return item
    })
    return (
      <div className="App">
        <input
          name="filter"
          placeholder="Search"
          onChange={this.handleInput}
        />
        <div className="chars">
          {display.map((item, idx) => {
            return (
              <div 
                className="char"
              >
                <div
                  className="symbol"
                  dangerouslySetInnerHTML={{__html: '&#x' + item.code}} 
                />
                <div className="name">
                  {item.name.toLowerCase()}
                </div>
                <code>{'&#x' + item.code}</code>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default App