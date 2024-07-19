import React from 'react';
import '../styles/Home.css'; 

const Home: React.FC = () => {
    return (
        <>
        <div className="overlay-image"></div>
        <div className="container">
            <div className="normal-text">Yuxu's Labo</div>
                <br/>
            <div className="animated-text">Portfolio Website</div>
        </div>
        </>
    );
};

export default Home;
