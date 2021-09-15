import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  return (
    <div className="z-50">
      <div className="fixed bottom-0 lg:top-0 lg:bottom-auto lg:h-8 left-0 text-white ml-4 my-2 flex flex-col justify-center">
        <div className="lg:flex lg:flex-row lg:space-x-4">
          <div className="text-white">亚文化 - 色彩生成器</div>
          <div className="text-gray-500">
            © {new Date().getFullYear()} liyufan & zhuojinggang
          </div>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            className="text-gray-500"
          >
            京ICP备2021028932号-1
          </a>
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
