import React from 'react';
import ReactDom from 'react-dom';
import configureStore from './store/configureStore';
import Root from './pages/Root';
import './index.scss';

const store = configureStore();

// Render only in the browser, export otherwise
ReactDom.render(<Root store={store} />, document.getElementById('app'));
