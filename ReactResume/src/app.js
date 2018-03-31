import React from 'react';
import ReactDOM from 'react-dom';
import Resume from './resume/Resume.jsx';

ReactDOM.render(
   <Resume />,
   document.getElementById('app')
);

module.hot.accept();