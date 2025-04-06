import { Users } from 'lucide-react'
import React from 'react'

const RightSideComponent = () => {
  return (
    <div className="w-1/2 bg-purple-400 p-8 flex flex-col items-center justify-center text-center text-white h-screen">
          <h2 className="text-3xl font-semibold mb-6">Join the Community</h2>
          <p className="mb-4">Connect with others, share ideas, and grow together.</p>

          {/* Animated SVG or Image */}
          <div className="animate-pulse">
            <Users className="w-32 h-32 text-white mx-auto mb-4" />
          </div>

          <p className="mt-4 text-sm opacity-75">Become part of an amazing community of like-minded people.</p>
 </div>
  )
}

export default RightSideComponent