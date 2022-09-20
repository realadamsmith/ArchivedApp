import React from 'react';
import Header1 from '../components/Header1/index.js';
import Footer from './../components/Footer';

const HomepageLayout = props => {
  return (
      <div>
      <Header1 {...props} />
          <div className="fullHeight">

      {props.children}
      <Footer />
      </div>
    </div>
  );
};

export default HomepageLayout;


