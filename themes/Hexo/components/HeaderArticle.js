import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import formatDate from '@/lib/formatDate'
import CONFIG_HEXO from '../config_hexo'
import { useEffect } from 'react'

export default function HeaderArticle ({ post }) {
  const headerImage = post?.page_cover ? `url("${post.page_cover}")` : `url("/${CONFIG_HEXO.HOME_BANNER_IMAGE}")`

  const { locale } = useGlobal()
  const date = formatDate(
    post?.date?.start_date || post.createdTime,
    locale.LOCALE
  )

  const scrollTrigger = () => {
    const scrollS = window.scrollY
    const nav = document.querySelector('#sticky-nav')

    if (scrollS < 300) {
      nav && nav.classList.replace('bg-white', 'bg-none')
      nav && nav.classList.replace('text-black', 'text-white')
    } else {
      nav && nav.classList.replace('bg-none', 'bg-white')
      nav && nav.classList.replace('text-white', 'text-black')
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  return (
      <div
        className="w-full h-96 relative md:flex-shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: headerImage }}
      >
        <header className="animate__slideInDown animate__animated bg-black bg-opacity-70 absolute top-0 w-full h-96 py-10 flex justify-center items-center font-sans">
          <div>
            {/* 文章Title */}
            <div className="font-bold text-3xl shadow-text flex justify-center text-white dark:text-white font-sans">
              {post.title}
            </div>

            <section className="flex-wrap shadow-text flex justify-center mt-2 text-white dark:text-gray-400 font-light leading-8">
              <div>
                <Link href={`/category/${post.category}`} passHref>
                  <a className="cursor-pointer text-md mr-2 dark:hover:text-white border-b dark:border-gray-500 border-dashed">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
                    {post.category}
                  </a>
                </Link>
                <span className="mr-2">|</span>

                {post.type[0] !== 'Page' && (
                  <>
                    <Link
                      href={`/archive#${post?.date?.start_date?.substr(0, 7)}`}
                      passHref
                    >
                      <a className="pl-1 mr-2 cursor-pointer hover:underline border-b dark:border-gray-500 border-dashed">
                        {date}
                      </a>
                    </Link>
                  </>
                )}

                <div className="hidden busuanzi_container_page_pv font-light mr-2">
                  <span className="mr-2">|</span>
                  <span className="mr-2 busuanzi_value_page_pv" />
                  次访问
                </div>
              </div>
            </section>
          </div>
        </header>
      </div>
  )
}
