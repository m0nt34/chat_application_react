import React from 'react'
import ChatBody from './ChatBody'
import ChatDefaultImg from '../../assets/images/chatDefault.jpg'
const ChatRightSide = () => {
  return (
    <div className='flex flex-col h-full w-2/3'>
      <header  className='flex items-center justify-start gap-5 w-full border-b border-gray-700 p-5'>
        <img src={ChatDefaultImg} alt={ChatDefaultImg} className='rounded-full h-12'/>
        <h1 className='text-2xl text-white'>chat name</h1>
      </header>
      <ChatBody/>
    </div>
  )
}

export default ChatRightSide