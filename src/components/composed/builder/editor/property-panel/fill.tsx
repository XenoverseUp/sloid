import { ResetIcon } from "@radix-ui/react-icons"

const Fill = () => {
  return (
    <section className="py-2 pl-3 pr-2 bg-primary-foreground mx-3 border space-y-3 rounded-md text-primary">
      <header className="flex w-full justify-between items-center">
        <h2>Fill</h2>
        <button className="grid place-items-center text-neutral-400 rounded-sm bg-transparent hover:bg-black/5 w-6 h-6 transition-colors">
          <ResetIcon />
        </button>
      </header>
      <div className="rounded-full border w-full p-1">
        <div className="rounded-full w-5 h-5 bg-purple-500 aspect-square"></div>
      </div>
    </section>
  )
}
export default Fill
