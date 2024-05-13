import React, { FC } from 'react'

interface KeyboardInputProps {
    Letter:any
}

const KeyboardInput:FC<KeyboardInputProps> = ({Letter}) => {
  return (
    <div className='border-b-2 border-black w-10 items-center justify-center flex text-3xl p-2'>
        {Letter}
    </div>
  )
}

export default KeyboardInput