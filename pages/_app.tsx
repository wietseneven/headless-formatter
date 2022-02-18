import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
