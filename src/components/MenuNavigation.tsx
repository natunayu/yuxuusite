import React, { useEffect } from 'react';

interface MenuNavigationProps {
  pages: string[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const MenuNavigation: React.FC<MenuNavigationProps> = ({ pages, currentPage, setCurrentPage }) => {
  let beforePage: string = '';
  useEffect(() => {
    const backgroundContainer = document.querySelector('.background-container');


    const handleAnimationEnd = () => {
      if (currentPage === 'Home') {
        backgroundContainer?.classList.remove('midnight-background');
        backgroundContainer?.classList.remove('fade-out');
      }
    };

    if (backgroundContainer) {
      if (currentPage !== 'Home') {
        backgroundContainer.classList.remove('fade-out');
        backgroundContainer.classList.add('midnight-background');
      } else {
        backgroundContainer.classList.add('fade-out');
        backgroundContainer.addEventListener('animationend', handleAnimationEnd, { once: true });
      }
    }

    // クリーンアップ
    return () => {
      backgroundContainer?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [currentPage]);

  return (
    <nav className="digital-menu" role="navigation" aria-label="Main menu">
      {pages.map((page) => (
        <button
          key={page}
          className={`menu-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => {
            beforePage=currentPage;
            setCurrentPage(page);
            console.log(`Before Page: ${beforePage}`)
            console.log(`Current Page: ${page}`); // ページ遷移時にコンソールログを出力
          }}
          aria-pressed={currentPage === page}
        >
          {page.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

export default MenuNavigation;
