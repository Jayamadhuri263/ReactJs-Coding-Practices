import React,{useState} from 'react'
import './index.css'

const name = "Sarah Williams";
const initialLetter = name.toUpperCase().charAt(0);
const initialBal = 2000;


function CashWithdrawal() {
    const [balance, setBalance] = useState(initialBal);

    return (
    <div className='cash-withdrawal-container'>
          <div className='cash-withdrawal-mini-container'>
              <div className='cash-withdrawal-profile-container'>
                    <div className='cash-withdrawal-profile-icon'>
                        <p className='cashWithdrawal-initialLetter'>{initialLetter }</p>
                    </div>
                  <h1 className='cash-withdrawal-profile-name'>{ name }</h1>
                </div>
                <div className='cashWithdrawal-bal-container'>
                    <p className='cashWithdrawal-bal-heading'>Your Balance</p>
                    <h1 className='cashWithdrawal-bal-count'>{ balance } <br/> <span className='cashWithdrawal-bal-currency'>In Rupees</span></h1>
                </div>

                <div className='cashWithdrawal-withdraw-container'>
                    <h1 className='cashWithdrawal-withdraw-heading'>Withdraw</h1>
                    <p className='cashWithdrawal-withdraw-note'>CHOOSE SUM (IN RUPEES)</p>
                    <div className='cashWithdrawal-withdraw-money-container'>
                        <button className='cashWithdrawal-withdraw-money-button' onClick={() => setBalance( balance >= 0 ? balance - 50 : 0 ) } >50</button>
                        <button className='cashWithdrawal-withdraw-money-button' onClick={() => setBalance(balance >= 0 ? balance - 100 : 0 ) } >100</button>
                        <button className='cashWithdrawal-withdraw-money-button' onClick={() => setBalance(balance >= 0 ? balance - 250 : 0) } >250</button>
                        <button className='cashWithdrawal-withdraw-money-button' onClick={() => setBalance(balance >= 0 ? balance - 500 : 0) } >500</button>
                    </div>
                </div>
      </div>
    </div>
  )
}

export default CashWithdrawal
