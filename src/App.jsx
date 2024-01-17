import './styles/app.scss'

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Games from './components/Games/Games'


export default function App() {

  return (
    <>
      <Header></Header>
      <Sidebar></Sidebar>
      <Games></Games>
    </>
  )
}

