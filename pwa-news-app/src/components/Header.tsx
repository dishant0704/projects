
import ProfileIcon from './ProfileIcon';

const Header = () => {
  return (
    <div className='container mx-auto my-5'>
      <div className='flex border-b-2 border-b-neutral-900 '>        
      <div className='logoWrapper relative h-10 w-40 md:h-12 md:w-48 lg:h-13 lg:w-52 my-auto' >        
        {/* <Image 
        src="../images/ketanLogo_dark.svg" 
        fill // Image will fill the parent
        style={{ objectFit: 'cover' }} // CSS styling
        alt='ketanLogo'
        sizes="(max-width: 200px) 100vw, 50vw" //
        /> */}
        <span className='text-3xl' >News <span className='font-extrabold text-linkColor' >Demo</span></span>
      </div>
      <div className='flex-auto px-5'>
        {/* center  */}
      </div>
      <div>
        <ProfileIcon />
        {/* <button className='cursor-pointer' onClick={oauthSignOut}>Sign Out</button> */}
        </div>
      </div>
    </div>
  )
}

export default Header
