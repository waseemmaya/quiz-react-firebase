import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';
import registerServiceWorker from './registerServiceWorker';
import "../node_modules/grommet-css";
// import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<Quiz />, document.getElementById('root'));
registerServiceWorker();
