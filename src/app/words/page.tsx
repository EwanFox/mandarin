'use client'
import GridLayout from 'react-grid-layout';
import { Noto_Sans_SC } from 'next/font/google'
import useSWR from 'swr'
const NotoSans = Noto_Sans_SC({ preload: false })
const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
export default function Page() {
    const {data,error} = useSWR(`/api/query/`, fetcher)

    if (error) return <div className={'bg-slate-700 max-w-full h-screen flex-col flex items-center text-5xl text-white ' + NotoSans.className}>Failed to load! Report this to ewan@ewanfox.com</div>
    if (!data) return <div className={'bg-slate-700 max-w-full h-screen flex-col flex items-center text-5xl text-white ' + NotoSans.className}>Loading...</div>

    console.log(data)
    return (
        <div className={'bg-slate-700 max-w-full h-screen flex-col flex items-center text-5xl text-white ' + NotoSans.className}>
            <title>Mandarin Dictionary</title>
            <div className='py-8'>
                <h1><span className='text-red-300'>Mandarin Dictionary</span></h1>
            </div>
            <div className='grid grid-flow-col auto-cols-max gap-3'>
            {data.map((word: any) => {
                return (
                    <a href={"/word/" + word.word_id}>
                    <div key={word.id} className='bg-slate-800 rounded-md hover:bg-slate-900 flex items-center flex-col'>
                        <h1 className='px-8 pt-8 pb-4'>{word.word}</h1>
                        <h1 className='text-2xl'>{word.reading}</h1>
                    </div>
                    </a>
                )
            })}
            </div>
        </div>
    )
}