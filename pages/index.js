import Head from 'next/head'
import { useState, useEffect } from 'react'
import Loading from '../components/loading'
import axios from 'axios'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()
  const [colors, setColors] = useState()

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
    <div className="h-screen w-screen bg-gray-700">
      <Head>
        <title>亚色 Arthur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {colors && (
        <div className="h-full w-full fixed left-0 top-0 z-0">
          <div className="h-full w-full grid lg:grid-rows-1 lg:grid-cols-5 grid-rows-5 grid-cols-1">
            {colors.map((color, index) => (
              <div key={index} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      )}

      <div className="h-full flex flex-col justify-center w-4/5 lg:w-1/2 mx-auto z-10">
        <div className="p-8 z-10 bg-gray-700 w-full rounded-lg bg-opacity-50">
          <div className="text-center text-white pb-4 z-10">
            请输入任意文字，按回车键计算色板
          </div>
          <input
            className="w-full rounded-md border-gray-300 border-solid border-2 bg-transparent outline-none p-4 text-white z-10"
            placeholder="任意文字"
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                generateData(e.target.value)
              }
            }}
          />
        </div>
      </div>

      {loading && <Loading loadingInfo={`正在生成色板：${input}`} />}
    </div>
  )
}

export default Home
