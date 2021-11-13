import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Loading from '../components/loading'
import Header from '../components/header'
import axios from 'axios'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()
  const [colors, setColors] = useState(undefined)

  const inputRef = useRef()
  const p5Ref = useRef()

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

  useEffect(() => {
    const init = async () => {
      if (typeof window !== 'undefined') {
        p5Ref.current.innerHTML = ''

        let sketch = await import('p5').then((module) => {
          let p5 = module.default
          let sketch = new p5((s) => {
            s.setup = () => {
              s.createCanvas(
                p5Ref.current.clientWidth,
                p5Ref.current.clientHeight,
              )
              s.noLoop()
              s.noStroke()
              s.frameRate(10)
            }

            if (colors) {
              s.draw = () => {
                function makeTile(x, y, gap) {
                  s.shuffle(colors, true)
                  s.fill(colors[0])
                  s.square(x, y, gap)
                  s.push()
                  s.translate(x + gap / 2, y + gap / 2)
                  s.rotate(s.random([0, s.PI / 2, s.PI, (3 * s.PI) / 2]))
                  s.fill(colors[1])
                  let r = s.floor(s.random(4))
                  if (r == 0) {
                    s.arc(-gap / 2, 0, gap, gap, -s.PI / 2, s.PI / 2)
                  } else if (r == 1) {
                    s.rect(-gap / 2, -gap / 2, gap / 2, gap)
                  } else if (r == 2) {
                    s.triangle(
                      -gap / 2,
                      -gap / 2,
                      gap / 2,
                      -gap / 2,
                      -gap / 2,
                      gap / 2,
                    )
                  }
                  s.pop()
                }

                let gap = p5Ref.current.clientWidth / 5

                for (let x = 0; x < p5Ref.current.clientWidth; x += gap) {
                  for (let y = 0; y < p5Ref.current.clientHeight; y += gap) {
                    if (s.random() < 1 / 2) {
                      makeTile(x, y, gap / 2)
                      makeTile(x + gap / 2, y, gap / 2)
                      makeTile(x, y + gap / 2, gap / 2)
                      makeTile(x + gap / 2, y + gap / 2, gap / 2)
                    } else {
                      makeTile(x, y, gap)
                    }
                  }
                }
              }
            }
          }, p5Ref.current)
        })
      }
    }

    init()
  }, [colors])

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <Head>
        <title>亚色 Arthur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex h-full w-full lg:flex-col flex-row">
        <div className="flex-shrink h-full w-full relative">
          {/* {colors && (
            <div className="h-full w-full absolute left-0 top-0 pt-12 z-0">
              <div className="h-full w-full grid lg:grid-rows-1 lg:grid-cols-5 grid-rows-5 grid-cols-1 gap-4">
                {colors.map((color, index) => (
                  <div key={index} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          )} */}

          <div
            className="h-full w-full absolute left-0 top-0 z-0"
            ref={p5Ref}
          />

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

        {/* <div className="py-4 w-full lg:grid grid-rows-1 grid-cols-5 hidden">
          {colors.map((color, index) => (
            <div className="flex flex-col justify-center w-full" key={index}>
              <div className="mx-auto border border-white px-3 py-2 text-white">
                {color}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <div className="flex-none py-2 flex flex-col lg:flex-row space-x-4 w-full justify-center">
        <div className="text-gray-500 text-center">
          © {new Date().getFullYear()} liyufan & zhuojinggang
        </div>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          className="text-gray-500 text-center"
        >
          京ICP备2021028932号-1
        </a>
      </div>
    </div>
  )
}

export default Home
