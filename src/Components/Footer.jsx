import React from 'react'

function Footer() {
  return (
    <div>
         <footer className=" mx-auto w-full relative text-center bg-[#1F2937] text-white">
        <div className="px-6 md:py-14 xl:pt-20 xl:pb-12">
            <h2 className="font-bold text-3xl xl:text-4xl leading-snug">
              Ready to grow with WebDial? <br /> Be online today.
            </h2>
            <a className="mt-8 xl:mt-12 px-12 py-5 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500"
                href="https://www.webdial.in/contact-us/">Get
                started</a>
            <div className="mt-14 xl:mt-20">
                <nav className="flex flex-wrap justify-center text-lg font-medium">
                    <div className="px-5 py-2"><a href="https://www.webdial.in/contact-us/">Contact</a></div>
                    <div className="px-5 py-2"><a href="https://web.webdial.in/marketplace">Pricing</a></div>
                    <div className="px-5 py-2"><a href="https://www.webdial.in/our-team/">Our Team</a></div>
                    <div className="px-5 py-2"><a href="https://www.webdial.in/projects/">Projects</a></div>
                    <div className="px-5 py-2"><a href="https://www.webdial.in/services/">Services</a></div>
                </nav>
                <p className="mt-7 text-base">© 2024 WebDial</p>
            </div>
        </div>
    </footer>
        
    </div>
  )
}

export default Footer