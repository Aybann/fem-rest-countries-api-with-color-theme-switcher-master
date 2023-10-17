import CountryDetails from "./components/CountryDetails"
import Header from "./components/Header"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <main className="px-8 py-8 bg-gray-50 min-h-screen md:px-12 dark:bg-gray-800 dark:text-white">
          <div className=" max-w-[1220px] mx-auto">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/country/:id' element={<CountryDetails />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
