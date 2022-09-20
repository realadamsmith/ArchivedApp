import React from 'react';
import Header1 from '../components/Header1/index.js';
import Footer from './../components/Footer';

const MainLayout = props => {
  return (
    <div>
      <Header1 {...props}/>
      <div className="mainlayout">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;