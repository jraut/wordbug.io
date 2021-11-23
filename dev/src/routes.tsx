import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CharactersViewPage } from './components/Pages/CharactersViewPage'
import { FullLoreView } from './components/FullLoreView'
import { LoreViewPage } from './components/Pages/LoreViewPage'
import { GameViewPage } from './components/Pages/GameViewPage'
import { NationsViewPage } from './components/Pages/NationsViewPage'

interface GameState {
  gameOn: boolean
}
interface Route {
  path: string
  element: FC
  title: string
  state?: GameState
}

export const routes: Route[] = [
  { path: '/', element: FullLoreView, title: 'Home' },
  {
    path: 'game',
    element: GameViewPage,
    title: 'Game',
    state: { gameOn: true },
  },
  { path: 'history', element: LoreViewPage, title: 'History' },
  { path: 'characters', element: CharactersViewPage, title: 'Characters' },
  { path: 'nations', element: NationsViewPage, title: 'Nations' },
]

export const MenuItem: FC<Route> = ({ path, title }) => {
  const { pathname } = useLocation()
  const isActivePath = [path, `/${path}`].includes(pathname)
  // const isActivePath = [path, `/${path}`].includes(pathname)
  return (
    <Link
      to={path}
      className={`m-1 md:m-5 p-2 ${isActivePath ? 'bg-gray-200' : ''}`}
    >
      {title}
    </Link>
  )
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Navigation {
  routes: Route[]
}

export const Navigation: FC<Navigation> = ({ routes }) => {
  const location = useLocation()
  const { pathname } = location
  const gameOn = pathname === '/game' // todo: Maybe could use location.state to see if game is on
  return !gameOn ? (
    <nav>
      <ol>
        {routes.map((route) => (
          <MenuItem {...route} key={route.path} />
        ))}
      </ol>
    </nav>
  ) : (
    // TODO: show confirmation before navigating away
    <Link
      to="/"
      className={`absolute z-20 m-1 bg-gray-200 border-8 border-gray-300`}
    >
      BACK TO MENU
    </Link>
  )
}
