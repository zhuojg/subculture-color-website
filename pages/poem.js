import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from '../components/loading'
import axios from 'axios'
import moment from 'moment'

const Poem = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [record, setRecord] = useState()

  const getData = async () => {
    await axios
      .get('/api/poems')
      .then((res) => {
        if (res.status === 200) {
          setRecord(res.data)
          setLoading(false)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      <Head>
        <title>群体色彩诗篇</title>
      </Head>

      {loading && <Loading loadingInfo="正在加载，请稍候" />}

      <div className="fixed h-10 top-0 left-0 px-4 py-2 flex justify-between w-full bg-black z-10">
        <div
          className="flex cursor-pointer h-full z-10"
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

        <div className="text-white h-full flex flex-col justify-center z-10">
          群体色彩诗篇
        </div>
      </div>

      <div className="w-full py-12 flex flex-col">
        {!loading &&
          record.reverse().map((item, index) => {
            const time = new Date(item.time * 1000)

            return (
              <div className="flex flex-row w-full" key={index}>
                <div className="flex-grow flex flex-col">
                  {item.colors.split(',').map((color, index) => (
                    <div
                      className="w-full h-4"
                      key={index}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex-none w-1/4 pl-4 mr-8">
                  <div className="text-xs lg:text-sm text-gray-500">
                    {/* {`${time.getFullYear()}-${
                      time.getMonth() + 1
                    }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`} */}
                    {moment(time).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <span
                    title={item.text}
                    className="text-white text-sm lg:text-xl font-serif line-clamp-2"
                  >
                    {item.text}
                  </span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Poem
