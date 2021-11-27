import { polyfill } from 'mobile-drag-drop'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { useRoutes } from 'react-router'
import './App.css'
import { Navigation, routes } from './routes'
import { store } from './store'

polyfill()

const App: FC = () => {
  const routeElement = useRoutes(routes)
  return (
    <div className="relative App">
      <Provider store={store}>
        <Navigation routes={routes} />
        { routeElement }
      </Provider>
    </div>
  )
}

export default App
