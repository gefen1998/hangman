import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './firstProj/App';
import Sum from './firstProj/App';
import serviceWorker from '../src/registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Sum />, document.getElementById('root'));

// ReactDOM.render(
//     <h1 className='goldClass'> Hai. </h1>, 
//     document.getElementById('root')
// );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
