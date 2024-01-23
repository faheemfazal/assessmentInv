import React from 'react'



  function confirm({open , setOpen ,handleContinue}) {
   if(!open) return null 
  

     return (
    <>
    <div className='fixed top-0 bottom-0 bg-black rounded z-5 0 right-0 left-0 opacity-30' onClick={()=>setOpen(false)} />

<div className="fixed z-50 p-3  bg-white lg:right-1/3 top-44 left-20 right-20 bottom-44 rounded-2xl lg:left-1/3   shadow-2xl">
    <div>
        <h1 className='text-xl font-semibold'>Last row has not filled completely</h1>
    </div>
    <div className='w-full flex justify-end gap-3'>
    <button className="rounded-full font-semibold px-5 mt-1 border-[#6ea864] bg-red-700 border-2 text-sm h-10 " onClick={()=>setOpen(false)}>
              cancel
    </button>   
    <button className="rounded-full font-semibold px-5 mt-1 border-[#6ea864] border-2 text-sm h-10 hover:bg-[#6ea864] hover:text-white" onClick={handleContinue}>
              continue
    </button>

    </div>

</div>
    

   </>
  )
}

export default confirm

