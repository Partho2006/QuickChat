import React, { useContext, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { useEffect } from 'react';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChartContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  }

  // Handle sending an img
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = "";
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-y-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-300'>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-md" />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {onlineUsers?.includes(selectedUser._id) && (
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          )}
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-7' />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col gap-4 h-[calc(100%-120px)] overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-[#ffffff25]">

        {messages.map((msg, index) => {

          const isOwnMessage =
            (typeof msg.senderId === "object"
              ? msg.senderId._id
              : msg.senderId) === authUser?._id;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isOwnMessage ? "justify-end" : "justify-start"
                }`}
            >

              {/* Other User Avatar */}
              {!isOwnMessage && (
                <img
                  src={selectedUser?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-md"
                />
              )}

              {/* Message Bubble */}
              <div
                className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"
                  } max-w-[75%]`}
              >

                {msg.image ? (
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[240px] rounded-2xl border border-white/10 shadow-lg hover:scale-[1.01] transition-all duration-200"
                  />
                ) : (
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm md:text-[15px] break-words shadow-md backdrop-blur-md ${isOwnMessage
                        ? "bg-violet-600 text-white rounded-br-md"
                        : "bg-[#2a2f45]/90 text-gray-100 rounded-bl-md"
                      }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Time */}
                <span
                  className={`text-[10px] text-gray-400 mt-1 px-1 ${isOwnMessage ? "text-right" : "text-left"
                    }`}
                >
                  {formatMessageTime(msg.createdAt)}
                </span>
              </div>

              {/* Own Avatar */}
              {isOwnMessage && (
                <img
                  src={authUser?.profilePic || assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-md"
                />
              )}
            </div>
          );
        })}

        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input onChange={(e) => setInput(e.target.value)} value={input} onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder='Send a message' className='flex-1 text-smm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
          <input onChange={handleSendImage} type="file" name="" id="image" accept='image/png, image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-12 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg text-white font-medium'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChartContainer