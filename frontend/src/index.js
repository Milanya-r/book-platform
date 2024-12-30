import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Подключение глобальных стилей
import App from './App';  // Импорт App компонента
import { BrowserRouter as Router } from 'react-router-dom';  // Импорт Router

ReactDOM.render(
  <Router>  {/* Оборачиваем приложение в Router */}
    <App />
  </Router>,
  document.getElementById('root')  // Рендерим в элемент с id 'root'
);
