import React from 'react'

const Faq = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-10'>
        <h1 className='text-4xl font-bold text-blue-950 mb-5'>FAQ</h1>
      <div className='space-y-5 text-lg text-gray-700'>
        <div className='font-bold'>
            <h2>How to place order?</h2>
            <p>Add products to cart and click Order Now.</p>
        </div>
        <div>
            <h2 className='font-bold'>How to track delivery?</h2>
            <p>Go to my Orders section.</p>
        </div>

      </div>
    </div>
  )
}

export default Faq
