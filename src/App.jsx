import { useState } from 'react'
import Perform from './components/Perform'
import './App.css'
import Navbar from './components/Navbar'
import Headline from './components/Headline'
import StockList from './components/StockList'
import ChartComponent from './components/Chart'
import StockPie from './components/StockPie'
import PieChart from './components/StockPie'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-gray-900 overflow-hidden'>
    <Navbar/>
    <div className="flex justify-between ml-4">
    <Headline/>
    <Perform/>
    </div>
    <h2 className='text-white text-2xl ml-8 px-8 py-4' >Market</h2>
    <div className=" flex w-13/14 mx-14 my-4  bg-black">
      <StockList/>
      <ChartComponent/>
    </div>
    <div className=" w-13/14 mx-14 my-6">
    <PieChart/>
    </div>
    </div>
    </>
  )
}

export default App
