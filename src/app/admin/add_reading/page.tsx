'use client'
import useSWR from 'swr'


export default function Page() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            word_id: (event.currentTarget.elements.namedItem('word_id') as HTMLInputElement)?.value,
            reading: (event.currentTarget.elements.namedItem('reading') as HTMLInputElement)?.value,
            def_id: (event.currentTarget.elements.namedItem('def_id') as HTMLInputElement)?.value,
        }
        console.log(data)
        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/create_reading"

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
        const wordInput = document.getElementById('word_id') as HTMLInputElement;
        const typeInput = document.getElementById('reading') as HTMLInputElement;
        const defInput = document.getElementById('def_id') as HTMLInputElement;
        wordInput.value = '';
        typeInput.value = '';
        defInput.value = '';
    }
    return (
        <div className='max-w-full h-screen max-w-xs flex items-center justify-center'>
        <form onSubmit={handleSubmit} method="post" className='bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <label htmlFor="reading" className='block text-white text-sm font-bold mb-2'>Reading:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="reading" name="reading" required maxLength={225} />
            </div>
            <div className='mb-4'>
                <label htmlFor="word_id" className='block text-white text-sm font-bold mb-2'>Word ID:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" id="word_id" name="word_id" required maxLength={11} />
            </div>
            <div className='mb-4'>
                <label htmlFor="def_id" className='block text-white text-sm font-bold mb-2'>Definition ID:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" id="def_id" name="def_id" maxLength={11} />
            </div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create</button>
        </form>
        </div>
    )
}