
import React from 'react'
import MultiStep from 'react-multistep'
import CutOff from 'views/cutoff/CutOff'
import Kredit from 'views/kredit/Kredit'
import Review from 'views/review/Review'
import User from 'views/user/User'
import '../examples/css/custom.css'
import '../examples/css/normilize.css'
// import '../examples/css/skeleton.css'

const steps = [
  { component: <CutOff /> },
  { component: <Review /> },
  { component: <Kredit /> },
  { component: <User /> },
  { component: <Kredit /> },
  { component: <User /> },
  { component: <Kredit /> },
  { component: <User /> },
]

const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}

const App = () => (
  <div className="container ">
    <MultiStep steps={steps} prevStyle={prevStyle} nextStyle={nextStyle}/>
    <div className='container app-footer'>
      Payroll
    </div>
  </div>
)

export default App;