import Head from 'next/head'
import { useState, useEffect } from 'react'
import Loading from '../components/loading'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()

  return (
    <div className="h-screen w-screen bg-gray-700">
      <Head>
        <title>亚色 Arthur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-full flex flex-col justify-center w-4/5 lg:w-1/2 mx-auto">
        <div className="text-center text-white pb-4">
          请输入任意文字，按回车键计算色板
        </div>
        <input
          className="rounded-md border-gray-300 border-solid border-2 bg-gray-700 outline-none p-4 text-white"
          placeholder="任意文字"
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              setLoading(true)
              setInput(e.target.value.trim())
            }
          }}
        />
      </div>

      {loading && <Loading loadingInfo={`正在生成色板：${input}`} />}
    </div>
  )
}

export default Home
