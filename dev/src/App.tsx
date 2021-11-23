import { polyfill } from 'mobile-drag-drop'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'
import './App.css'
import { Navigation, routes } from './routes'
import { store } from './store'

polyfill()

const App: FC = () => {
  return (
    <div className="relative App">
      <Provider store={store}>
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
      </Provider>
    </div>
  )
}

export default App
