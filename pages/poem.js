import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Poem = () => {
  const router = useRouter()

  useEffect(() => {}, [])

  return (
    <div className="w-screen min-h-screen bg-black">
      <Head>
        <title>群体色彩诗篇</title>
      </Head>

      <div className="fixed h-8 top-0 left-0 ml-4 my-2">
        <div
          className="flex cursor-pointer h-full"
          onClick={() => {
            router.push('/')
          }}
        >
          <div className="flex flex-col justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-sub-purple mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
          <div className="text-white h-full flex flex-col justify-center">
            亚文化 - 色彩生成
          </div>
        </div>
      </div>

      <div className="fixed h-8 top-0 right-0 mr-4 my-2">
        <div className="text-white h-full flex flex-col justify-center">
          群体色彩诗篇
        </div>
      </div>
    </div>
  )
}

export default Poem
