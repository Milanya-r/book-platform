import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            welcome: "Welcome to our platform!",
            books: "Books",
            authors: "Authors",
            login: "Login",
            register: "Register",
            adminDashboard: "Admin Dashboard",
            chat: "Chat Room",
            searchAuthors: "Search Authors",
        },
    },
    ru: {
        translation: {
            welcome: "Добро пожаловать на нашу платформу!",
            books: "Книги",
            authors: "Авторы",
            login: "Вход",
            register: "Регистрация",
            adminDashboard: "Панель администратора",
            chat: "Комната чата",
            searchAuthors: "Поиск авторов",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Установите "ru" для русского языка по умолчанию
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
