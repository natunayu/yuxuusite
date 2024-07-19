import React from 'react';
import '../styles/Profile.css';
import '../styles/Midnight.css';

const About: React.FC = () => {
  

  return (      
    <div className="page-container">
      <div className="page-content">
      <h1>About me</h1>
        <div className="intro-box">
          <img src="/about/cat on the laptop.jpg" alt="Profile Photo" className="profile-photo" />
          <div className="intro-text">
            <h2><ruby>渡邉<rt>わたなべ</rt></ruby>&nbsp;<ruby>優太<rt>ゆうた</rt></ruby></h2>
            <h3>東海大学大学院 <br/>
            情報通信学研究科情報通信学専攻 大東研究室
            </h3> <p>
            現在はセキュリティ・ネットワークに興味があります！<br/>
            趣味でアプリを作ったり、絵を描いたり、サーバを建てたりしています。<br/>
            <br/>
            資格:<br/>
            &nbsp;2021年12月 基本情報処理技術者試験 合格<br/>
            &nbsp;2024年&nbsp;7月 応用情報処理技術者試験 合格<br/>
            &nbsp;2024年10月 情報処理安全確保支援士試験 勉強中

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
