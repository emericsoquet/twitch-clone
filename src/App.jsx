
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/app.scss';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import LiveStream from './components/LiveStream/LiveStream';
import GameStreams from './components/GameStreams/GameStreams';
import Results from './components/Results/Results';
import Error from './components/Error/Error';


export default function App() {

  return (
      <BrowserRouter>
          <Header></Header>
          <Sidebar></Sidebar>

          <main>
            <Routes>
              <Route exact path="/" element={<Games />} />
              <Route exact path="/top-streams" element={<TopStreams />} />
              <Route exact path="/live/:slug" element={<LiveStream />} />
              <Route exact path="/game/:slug" element={<GameStreams />} />
              <Route exact path="/results/:slug" element={<Results />} />
              <Route exact path="/results" element={<Error />} />
            </Routes>
          </main>
      </BrowserRouter>
  )
}

