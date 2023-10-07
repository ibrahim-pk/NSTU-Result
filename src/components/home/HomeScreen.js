import React from 'react';
import Navbar from './Navbar';
import OfferCard from './OfferCard';
import Footer from './Footer';

const HomeScreen = () => {
    return (
        <div>
            <Navbar></Navbar>
             <OfferCard></OfferCard>
             <Footer></Footer>
        </div>
    );
};

export default HomeScreen;