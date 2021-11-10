import { FC } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import { Navigation, routes } from './routes'

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
    </div>
  )
}

export default App
