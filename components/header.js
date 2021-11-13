import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return (
    <div className="fixed z-50 bg-black h-12 w-full">
      <div className="fixed top-0 h-8 left-0 text-white ml-4 my-2 flex flex-col justify-center">
        <div className="lg:flex lg:flex-row lg:space-x-4">
          <div className="text-white">亚文化 - 色彩生成器</div>
        </div>
      </div>

      <div className="fixed top-0 right-0 mr-4 my-2 h-8">
        <div
          className="flex cursor-pointer h-full"
          onClick={() => {
            router.push('/poem')
          }}
        >
          <div className="text-white flex flex-col justify-center">
            群体色彩诗篇
          </div>

          <div className="h-full text-sub-purple ml-2 flex flex-col justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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
  )
}

export default Header
