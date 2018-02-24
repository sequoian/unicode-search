import data from './unicode.json'
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.defaultLimit = 200
    this.limitIncrease = 100
    this.state = {
      chars: data,
      filter: '',
      limit: this.defaultLimit,
      showDupes: false
    }
    this.handleInput = this.handleInput.bind(this)
    document.addEventListener('scroll', () => {
      const scrollPercentage = (window.innerHeight + window.pageYOffset) / document.body.offsetHeight
      if (scrollPercentage > 0.9) {
        this.setState(prevState => {
          return {
            limit: prevState.limit + this.limitIncrease
          }
        })
      }
    })
  }

  handleInput(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value,
      limit: this.defaultLimit
    })
  }

  render() {
    const {chars, filter, limit, showDupes} = this.state
    const filtered = chars.filter(item => {
      if (item.name.toLowerCase().indexOf(filter) > -1) return item
    })
    let deDuped
    if (showDupes) {
      deDuped = filtered
    }
    else {
      const map = new Map()
      filtered.forEach(item => {
        map.set(item.code, item)
      })
      deDuped = Array.from(map.values())
    }
    
    const limited = deDuped.filter((item, idx) => {
      if (idx < limit) return item
    })
    return (
      <div className="App">
        <input
          name="filter"
          placeholder="Search"
          onChange={this.handleInput}
        />
        <div className="chars">
          {limited.map((item, idx) => {
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