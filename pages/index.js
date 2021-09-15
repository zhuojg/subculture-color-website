import Head from 'next/head'
import { useState, useRef } from 'react'
import Loading from '../components/loading'
import Header from '../components/header'
import axios from 'axios'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()
  const [colors, setColors] = useState(Array(5).fill('#000000'))

  const inputRef = useRef()

  const generateData = async (inputText) => {
    setLoading(true)
    setInput(inputText)
    await axios
      .post('/api/generate', { input_text: inputText })
      .then((res) => {
        if (res.status === 200) {
          setColors(res.data.colors)
        }
      })
      .catch((err) => console.log(err))

    setLoading(false)
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <Head>
        <title>亚色 Arthur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex h-full w-full lg:flex-col flex-row">
        <div className="flex-shrink h-full w-full relative">
          {colors && (
            <div className="h-full w-full absolute left-0 top-0 pt-12 z-0">
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

        <div className="py-4 w-full lg:grid grid-rows-1 grid-cols-5 hidden">
          {colors.map((color, index) => (
            <div className="flex flex-col justify-center w-full" key={index}>
              <div className="mx-auto border border-white px-3 py-2 text-white">
                {color}
              </div>
            </div>
          ))}
          <div className=""></div>
        </div>
      </div>
    </div>
  )
}

export default Home
