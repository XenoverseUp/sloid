import { ResetIcon } from "@radix-ui/react-icons"

const Fill = () => {
  return (
    <section className="py-2 pl-3 pr-2 bg-primary-foreground mx-3 border rounded-md text-primary">
      <header className="flex w-full justify-between items-center">
        <h2>Fill</h2>
        <button className="grid place-items-center text-neutral-400 rounded-sm bg-transparent hover:bg-black/5 w-6 h-6 transition-colors">
          <ResetIcon />
        </button>
      </header>
      <div></div>
    </section>
  )
}
export default Fill
