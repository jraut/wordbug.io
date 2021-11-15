import { FC } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import { Navigation, routes } from './routes'
import { polyfill } from 'mobile-drag-drop'
import {
  CharacterDialog,
  CharacterLineType,
} from './components/CharacterDialog'

polyfill()

const App: FC = () => {
  return (
    <div className="App">
      <Navigation routes={routes} />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
      <CharacterDialog character="Rugo" lineType={CharacterLineType.Ok} />
    </div>
  )
}

export default App
