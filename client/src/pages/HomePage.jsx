import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChartContainer from '../components/ChartContainer'

const HomePage = () => {
    const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center">

  <div className={`w-full max-w-7xl h-[90vh] backdrop-blur-xl border border-gray-600 rounded-2xl overflow-hidden grid 
  ${selectedUser 
    ? 'md:grid-cols-[300px_1fr_250px]' 
    : 'md:grid-cols-[300px_1fr]'}`}>     
            <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <ChartContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
    </div>
  )
}

export default HomePage