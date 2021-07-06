import React from 'react'
import './LandingPage.css'
class LandingPage extends React.Component {
    render() {
        return (
            <div id='main-container'>


                <h1>Welcome To Our Future Generation </h1>
                <h1>Raffles</h1>
                <div className="row">
                    <div className='column box'>
                        <h4>Current Raffles</h4>
                        <button>test</button>
                        <button>test</button>
                        <button>test</button>
                    </div>
                    <div className="column box">
                        <h4>Past Winners</h4>
                        <button>test</button>
                        <button>test</button>
                        <button>test</button>
                    </div>
                </div>
                
                    <button id="register">REGISTER TO ENTER</button>
                    <button id="login">LOGIN</button>
            </div>
        )
    }
}

export default LandingPage


// import React from 'react'
// import './LandingPage.css'
// const CurrentRaffle = (props) => {
//     return (
//       <div>
//         <img />
//         <p>This is a laptop</p>
//         <button>test</button>
//       </div>
//     );
//   };
  
//   class LandingPage extends React.Component {
//       // state
//       state = {
//           currentRaffles: []
//       }

  
//       componentDidMount(){
//           // make network request
//           // use method to populate UI with current raffles
//       }
  
//       populateCurrent(){
//           // iterate over returned raffles, map over and return JSX -> CurrentRaffle components
//             return this.state.currentRaffles.map(cur => {
//                 <CurrentRaffle img={cur.img} description={cur.description} />
//             })
//       }
//     render() {
//         return (
//             <div id='main-container'>


//                 <h1>Welcome To Our Future Generation </h1>
//                 <h1>Raffles</h1>
//                 <div className="row">
//                 <div className='column box'>
//                         <h4>Current Raffles</h4>
//                       {this.populateCurrent()}
//                     </div>
//                     <div className="column box">
//                         <h4>Past Winners</h4>
//                         <button>test</button>
//                         <button>test</button>
//                         <button>test</button>
//                     </div>
//                 </div>
                
//                     <button id="register">REGISTER TO ENTER</button>
//                     <button id="login">LOGIN</button>
//             </div>
//         )
//     }
// }

// export default LandingPage