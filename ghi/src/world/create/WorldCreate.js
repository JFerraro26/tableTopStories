import React, { useState } from 'react';

function WorldCreate() {
    return (
        <div className='grid grid-cols-5'>
            <div className='flex flex-col col-start-2 col-span-3 items-center'>
                <h1>Create New World</h1>
                <form>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Name</label>
                        <input className='border' required type='text' name='name' placeholder='World Name' />
                    </div>
                    <button className='border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default WorldCreate
