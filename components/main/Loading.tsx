import React from 'react'

function Loading({msg}:{msg:String}) {
  return ( 
    <div className="flex  justify-center items-center flex-col w-full h-screen">
    <div className="custom-loader"></div>
    <p className='font-semibold mt-5 animate-pulse'>{msg}</p>
  </div>
  )
}

export default Loading