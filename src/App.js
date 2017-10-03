import React, {Component} from 'react'
import classes from './app.scss'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={classes.main}>
        <h1>ES6 + Webpack starter</h1>
        <h2>Paulo Chaves from Piaui, Brazil</h2>
      </div>
    )
  }
}

export default App
