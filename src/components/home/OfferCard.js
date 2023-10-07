import React from 'react';

const OfferCard = () => {
    return (
        <div className='max-w-screen-lg mx-auto my-5'>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% card w-72  shadow-xl">
            <figure className="px-10 pt-10">
            <i className="fas fa-2x fa-poll"></i>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-base-100">Free Plan</h2>
                <p className='text-4xl text-base-100 text-bold'>$0</p>
                <p className='text-base text-base-100'><i class="fas fa-check mx-1"></i>128MB Space</p>
                <p className='text-base text-base-100'><i class="fas mx-1 fa-check"></i>200 Student Registration</p>
                <p className='text-base text-base-100'><i class="fas fa-check mx-1"></i>Only For 1Month</p>
                <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
         </div>
    );
};

export default OfferCard;