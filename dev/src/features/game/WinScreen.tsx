// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WinScreen {}

export const WinScreen: React.FC<WinScreen> = ({}) => {
  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <p className="m-auto text-6xl">YOU WON</p>
      <p className="m-auto text-6xl">Congrats</p>
      <p className="m-auto text-6xl">WP!</p>
      <p className="m-auto text-6xl">
        Hope you had fun! I did while making the game! :)
      </p>
    </div>
  )
}
