"use client"
import Navbar from '@/components/navs/Navbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Navbar />
    {
        children
    }
    </>
  )
}

export default layout