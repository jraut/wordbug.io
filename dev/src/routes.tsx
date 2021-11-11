import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Characters } from './components/Characters'
import { FullLoreView } from './components/FullLoreView'
import { HistoryView } from './components/HistoryView'
import { GameViewPage } from './components/Pages/GameViewPage'

interface Route {
  path: string
  element: FC
  title: string
}

export const routes: Route[] = [
  { path: '/', element: FullLoreView, title: 'Home' },
  { path: 'game', element: GameViewPage, title: 'Game' },
  { path: 'history', element: HistoryView, title: 'History' },
  { path: 'characters', element: Characters, title: 'Characters' },
]

export const MenuItem: FC<Route> = ({ path, title }) => {
  const { pathname } = useLocation()
  const isActivePath = [path, `/${path}`].includes(pathname)
  // const isActivePath = [path, `/${path}`].includes(pathname)
  return (
    <Link to={path} className={`m-5 p-2 ${isActivePath ? 'bg-gray-200' : ''}`}>
      {title}
    </Link>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Navigation {
  routes: Route[]
}

export const Navigation: FC<Navigation> = ({ routes }) => {
  return (
    <nav>
      <ol>
        {routes.map((route) => (
          <MenuItem {...route} key={route.path} />
        ))}
      </ol>
    </nav>
  )
}
