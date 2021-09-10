import Head from 'next/head'
import { useState, useRef } from 'react'
import Loading from '../components/loading'
import axios from 'axios'
import { useRouter } from 'next/router'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()
  const [colors, setColors] = useState(Array(5).fill('#000000'))
  const router = useRouter()

  const inputRef = useRef()

  const generateData = async (inputText) => {
    setLoading(true)
    setInput(inputText)
    const result = await axios.post('/api/generate', { input_text: inputText })
    if (result.status === 200) {
      setColors(result.data.colors)
    }
    setLoading(false)
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <Head>
        <title>亚色 Arthur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-2">
        <div className="text-white pl-4 py-2">亚文化 - 色彩生成器</div>

        <div className="pr-2 flex flex-row justify-end">
          <div
            className="flex p-2 cursor-pointer"
            onClick={() => {
              router.push('/poem')
            }}
          >
            <span className="text-white">群体色彩诗篇</span>

            <div className="flex flex-col justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-sub-purple ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow h-0 w-full relative">
        {colors && (
          <div className="h-full w-full absolute left-0 top-0 z-0">
            <div className="h-full w-full grid lg:grid-rows-1 lg:grid-cols-5 grid-rows-5 grid-cols-1 gap-4">
              {colors.map((color, index) => (
                <div key={index} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        )}

        <div className="h-full flex flex-col justify-center w-4/5 lg:w-1/2 mx-auto z-10">
          <input
            ref={inputRef}
            className="w-full rounded-md border-gray-300 border-solid border-2 bg-black outline-none text-center p-4 text-white z-10"
            placeholder="请输入任意文字"
          />

          <button
            className="text-sub-purple border-sub-purple border-2 p-2 rounded-lg mx-auto mt-4 z-10 bg-black"
            onClick={() => {
              generateData(inputRef.current.value)
            }}
          >
            点击生成色板
          </button>
        </div>

        {loading && <Loading loadingInfo={`正在生成色板：${input}`} />}
      </div>
      
      <div className="py-4 w-full grid grid-cols-5">
        {colors.map((color, index) => (
          <div className="flex flex-col justify-center w-full" key={index}>
            <div className="mx-auto border border-white px-3 py-2 text-white">{color}</div>
          </div>
        ))}
        <div className=""></div>
      </div>
    </div>
  )
}

export default Home
