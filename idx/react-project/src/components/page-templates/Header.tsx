import "../../assets/hero.png"
import ThemeToggle from "../ThemeToggle"
const Header = () => {
  return (
    <>
      <div className='flex flex-row gap-5 p-5 border-b border-gray-300 dark:border-zinc-600 dark:bg-zinc-900 bg-black'>
        <div className="basis-1/4 md:basis-1/10">
          <div className="h-12 md:h-10 w-full bg-[url('./images/idx_white_logo.svg')] bg-contain bg-no-repeat bg-center">
            {/* logos */}
          </div>
        </div>
        <div className="grid justify-items-end flex-1">
          {/* Namvigation */}          
            <ThemeToggle className="" />          
        </div>
      </div>

    </>
  )
}

export default Header
