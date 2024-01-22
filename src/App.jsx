
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/app.scss'

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'
import TopStreams from './components/TopStreams/TopStreams'


export default function App() {

  return (
      <BrowserRouter>
          <Header></Header>
          <Sidebar></Sidebar>

          <main>
            <Routes>
              <Route exact path="/" element={<Games />} />
              <Route exact path="/top-streams" element={<TopStreams />} />
            </Routes>
          </main>
      </BrowserRouter>
  )
}

