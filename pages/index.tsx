import { NextSeo } from 'next-seo'
import LogoBackground from '../components/LogoBackground'
import { SyntheticEvent, useRef, useState } from 'react'
import cN from 'classnames'
// @ts-ignore
import dJSON from 'dirty-json'
import dynamic from 'next/dynamic'
import { v4 as uuidv4 } from 'uuid'

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

interface Data {
  type: 'json' | 'jwt'
  id: string
  content: any
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Data[]>([])
  const resultRef = useRef<HTMLElement>(null)

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    setLoading(true)
    const target = event.target as typeof event.target & {
      data: { value: string }
    }
    const inputData = target.data.value
    // const { payload, protectedHeader } = await jose.jwtVerify(inputData, "", {
    //   issuer: 'urn:example:issuer',
    //   audience: 'urn:example:audience'
    // })
    try {
      const payload = parseJwt(inputData)
      setData((prevData) => [
        { type: 'jwt', id: uuidv4(), content: payload },
        ...prevData,
      ])
      setLoading(false)
      return
    } catch (e) {
      //
    }
    try {
      const parsedData = dJSON.parse(inputData)
      setData((prevData) => [
        { type: 'json', id: uuidv4(), content: parsedData },
        ...prevData,
      ])
    } catch (e) {}
    setLoading(false)

    if (resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <LogoBackground />
      <NextSeo title="Formatter & Validator" />

      <main className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-20">
        <h1 className="text-6xl font-bold text-white">Headless Formatter</h1>

        <p className="mt-3 text-2xl text-white">
          Get started by pasting your code
        </p>

        <form onSubmit={handleSubmit} className="w-full text-center">
          <textarea
            name="data"
            placeholder="{}"
            className="my-8 w-full rounded-xl p-6"
            style={{ minHeight: 300 }}
            autoFocus
          />
          <button
            className={cN('rounded bg-white px-4 py-2', {
              'opacity-50': loading,
            })}
            disabled={loading}
            type="submit"
          >
            Process
          </button>
        </form>
        <section
          ref={resultRef}
          className="w-full space-y-4 py-24"
          id="results"
        >
          {data.map((item, index) => (
            <article
              key={item.id}
              className="w-full rounded-xl bg-black py-4 px-8 text-white"
            >
              <h2 className="mb-2 text-2xl">
                <span className="text-4xl">{data.length - index}</span> -{' '}
                {item.type}
              </h2>
              <div
                className="rounded-xl bg-white py-4 px-2"
                style={{
                  backgroundColor: 'rgb(39, 40, 34)',
                  fontSize: '1.25em',
                }}
              >
                <ReactJson
                  displayDataTypes={false}
                  theme="monokai"
                  src={item.content}
                />
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
