import React, {  useState } from 'react'
import './index.css'

function FruitsCounter() {
    const[mango, setMangoes] = useState(0);
    const [banana, setBananas] = useState(0)

  return (
    <div className='fruits-container'>
                <div className='fruits-mini-container'>
                    <h1 className='fruits-values'>Bob ate <span className='fruit-count'>{mango}</span> mangoes and <span className='fruit-count'>{banana}</span> bananas</h1>
                    <div className='fruits-calculate'>
                        <button className='fruit-button' onClick={() => setMangoes(mango+1)}>Eat Mango</button>
                        <button className='fruit-button' onClick={() => setBananas(banana+1)}>Eat Banana</button>
                    </div>
                </div>
        </div>
  )
}

export default FruitsCounter





// class FruitsCounter extends Component {
        // constructor(props) {
        //   super(props)
        
        //   this.state = {
        //       mango: 0, banana;0
        //   }
        // }
        
    
//     onMangoEat = () => {
//         this.setState(prevState =>({ mango: prevState.mango + 1}))
//     }
//     onBananaEat = () => {
//         this.setState(prevState =>({ banana: prevState.banana + 1}))
//     }

//     render() {
//         const { mango, banana } = this.state
//         return (
        //         <div className='fruits-container'>
        //         <div className='fruits-mini-container'>
        //             <h1 className='fruits-values'>Bob ate <span className='fruit-count'>{mango}</span> mangoes and <span className='fruit-count'>{banana}</span> bananas</h1>
        //             <div className='fruits-calculate'>
        //                 <button className='fruit-button' onClick={() => setMangoes(mango+1)}>Eat Mango</button>
        //                 <button className='fruit-button' onClick={() => setBananas(banana+1)}>Eat Banana</button>
        //             </div>
        //         </div>
        // </div>
//         )
//     }
// }

// export default FruitsCounter
