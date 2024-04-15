import React from 'react'

function ProgressBar({progress}) {
  return (
    <div>
      <h1 className='bg-gray-400 h-4 w-full mt-3 rounded-full'>
        <div className='bg-primary h-4 py-0.2 rounded-full text-[10px] text-white' style={{width: `${progress}%`}}>
        {`${Number(progress).toFixed(0)}%`}
        </div>
      </h1>
    </div>
  )
}

export default ProgressBar
