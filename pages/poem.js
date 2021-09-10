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

      <div className="grid grid-cols-2">
        <div className="pl-2 flex flex-row">
          <div
            className="flex p-2 cursor-pointer"
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
            <span className="text-white">亚文化 - 色彩生成</span>
          </div>
        </div>

        <div className="text-white pr-4 py-2 flex justify-end">群体色彩诗篇</div>
      </div>
    </div>
  )
}

export default Poem
