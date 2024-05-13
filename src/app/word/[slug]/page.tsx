'use client'
import useSWR from 'swr'
import { Noto_Sans_SC } from 'next/font/google'
const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
const NotoSans = Noto_Sans_SC({ preload: false })

export default function Page({ params }: { params: { slug: string } }) {
    const { data, error } = useSWR(`/api/query/${params.slug}`, fetcher)

    if (error) return <div className={'bg-slate-700 max-w-full h-screen flex-col flex items-center text-5xl text-white ' + NotoSans.className}>Failed to load! Report this to ewan@ewanfox.com</div>
    if (!data) return <div className={'bg-slate-700 max-w-full h-screen flex-col flex items-center text-5xl text-white ' + NotoSans.className}></div>
    console.log(data)
    return (
        <div className='bg-slate-700 h-full'>
            <title>{data[0].word}</title>
                <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
             <div className='py-2 bg-slate-700'>
                <a href='/words'>&lt;- Back</a>
            </div>
        <div className={'bg-slate-700 max-w-full h-full flex-col flex items-center text-5xl text-white ' + NotoSans.className}>
            <div className='py-8'>
                <h1><span className='text-red-300'>{data[0].word}</span></h1>
            </div>
            <div className='text-xl'>
                <p>Reading: <span className='text-red-300'>{data[0].reading}</span></p>
                <p>Word Type: <span className='text-red-300'>{data[0].word_type}</span></p>
                <p>Definition: <span className='text-red-300'>{data[0].def}</span></p>
            </div>
        </div>
        </div>
    )
}