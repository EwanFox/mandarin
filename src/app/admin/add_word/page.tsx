'use client'
import useSWR from 'swr'


export default function Page() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            word: (event.currentTarget.elements.namedItem('word') as HTMLInputElement)?.value,
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/create_word"

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
        const wordInput = document.getElementById('word') as HTMLInputElement;
        wordInput.value = '';
    }
    return (
        <div className='max-w-full h-screen max-w-xs flex items-center justify-center'>
        <form onSubmit={handleSubmit} method="post" className='bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <label htmlFor="word" className='block text-white text-sm font-bold mb-2'>Word:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="word" name="word" required maxLength={50} />
            </div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create</button>
        </form>
        </div>
    )
}