import React, { Component } from 'react'
import './index.css'

export class Speedometer extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         speed:0
      }
    }

    onAccelerate = () => {
        const { speed } = this.state
        if (speed < 200){
            this.setState(prevState => ({
            speed:prevState.speed + 10
        }))
        }
    } 
    onBrake = () => {
        const { speed } = this.state
        if (speed > 0) {
            this.setState(prevState => ({
            speed:prevState.speed - 10
        }))
        }
    } 

    render() {
        const { speed } = this.state
        return (
        <div className='speedometer-container'>
                <h1 className='speedometer-heading'>speedometer</h1>
                <img src="https://assets.ccbp.in/frontend/react-js/speedometer-img.png" alt="speedometer" className='speedometer-image' />
                <h2 className='speedometer-value'>Speed is {speed}kmph</h2>
                <p className='speedometer-limit'>Min limit is 0kmph, Max limit is 200kmph </p>
                <div className='speedometer-button-container'>
                    <button className='speedometer-accelerate' onClick={this.onAccelerate}>Accelerate</button>
                    <button className='speedometer-brake' onClick={this.onBrake}>Apply brake</button>
                </div>
        </div>
        )
    }
}

export default Speedometer
