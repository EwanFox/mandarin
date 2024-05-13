'use client'
import useSWR from 'swr'


export default function Page() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = {
            word_id: (event.currentTarget.elements.namedItem('word_id') as HTMLInputElement)?.value,
            def: (event.currentTarget.elements.namedItem('def') as HTMLInputElement)?.value,
            word_type: (event.currentTarget.elements.namedItem('word_type') as HTMLInputElement)?.value,
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/create_def"

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
        const typeInput = document.getElementById('word_type') as HTMLInputElement;
        const defInput = document.getElementById('def') as HTMLInputElement;
        wordInput.value = '';
        typeInput.value = '';
        defInput.value = '';
    }
    return (
        <div className='max-w-full h-screen max-w-xs flex items-center justify-center'>
        <form onSubmit={handleSubmit} method="post" className='bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <label htmlFor="def" className='block text-white text-sm font-bold mb-2'>Definition:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="def" name="def" required maxLength={225} />
            </div>
            <div className='mb-4'>
                <label htmlFor="word_id" className='block text-white text-sm font-bold mb-2'>Word ID:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" id="word_id" name="word_id" required maxLength={11} />
            </div>
            <div className='mb-4'>
                <label htmlFor="word_type" className='block text-white text-sm font-bold mb-2'>Word Type:</label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="word_type" name="word_type" required maxLength={50} />
            </div>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create</button>
        </form>
        </div>
    )
}