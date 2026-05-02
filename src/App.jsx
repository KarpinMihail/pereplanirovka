import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Bonus from './components/Bonus';
import Quiz from './components/Quiz';
import Advantages from './components/Advantages';
import BeforeAfter from './components/BeforeAfter';
import Reviews from './components/Reviews';     // < добавить импорт
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Header />
            <Hero />
            <Bonus />
            <Quiz />
            <Advantages />
            <BeforeAfter />
            <Reviews />      {/* < добавить компонент */}
            <Footer />
        </>
    );
}

export default App;