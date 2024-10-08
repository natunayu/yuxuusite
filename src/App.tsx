import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/Loading.css';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ThreeScene from './components/ThreeScene';
import CursorCircle from './components/Cursor';
import { Loading } from './components/Loading'; 
import MenuNavigation from './components/MenuNavigation'; 

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isLoading, setIsLoading] = useState(true); // ロード中の状態を管理するステート

  const pages = ['Home', 'About', 'Projects', 'Contact'];

  useEffect(() => {
    // simulate a delay to show the loading component
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3秒後にロード完了とする

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home': return <Home />;
      case 'About': return <About />;
      case 'Projects': return <Projects />;
      case 'Contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="App">
      <ThreeScene />
      {isLoading ? (
        <div className="loading-overlay">
          <Loading /> 
        </div>
      ) : (
        <>
          <div className="background-container"></div> {/* 背景用のコンテナを追加 */}
          <CursorCircle />
          <MenuNavigation 
            pages={pages} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
          <main className="page-container">
            {renderPage()}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
