import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Используем маршруты
import Navbar from './components/Layout/Navbar'; // Ваш компонент навигации
import BookSearch from './components/Search/BookSearch';
import Blog from './components/Blog/Blog';
import TaskManager from './components/Tasks/TaskManager'; // Импорт TaskManager
import NotificationList from './components/Notifications/NotificationList';
import UserProfile from './components/Profile/UserProfile';
import UserAchievements from './components/Achievements/UserAchievements';

const App = () => {
  return (
    <div>
      <Navbar /> {/* Навигация */}
      <Routes> {/* Маршруты */}
        <Route path="/" element={<BookSearch />} />
        <Route path="/books" element={<BookSearch />} /> {/* Добавляем маршрут для /books */}
        <Route path="/authors" element={<div>Authors Page</div>} /> {/* Заглушка для авторов */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/tasks" element={<TaskManager />} />
        <Route path="/notifications" element={<NotificationList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/achievements" element={<UserAchievements />} />
      </Routes>
    </div>
  );
};

export default App;
