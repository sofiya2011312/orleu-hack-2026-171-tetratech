
const translations = {
  ru: {
    home: "Главная",
    attractions: "Достопримечательности",
    map: "Карта",
    routes: "Маршруты",
    planner: "Планировщик",
    reviews: "Отзывы",
    search: "Поиск",
    all: "Все",
    restaurants: "Рестораны",
    hotels: "Отели",
    cafes: "Кафе",
    toilets: "Туалеты",
    discover: "Открой Казахстан",
    subtitle: "Исследуй удивительные места Казахстана",
    learnMore: "Подробнее",
    addToRoute: "Добавить в маршрут"
  },

  kk: {
    home: "Басты бет",
    attractions: "Көрікті жерлер",
    map: "Карта",
    routes: "Маршруттар",
    planner: "Саяхат жоспарлаушы",
    reviews: "Пікірлер",
    search: "Іздеу",
    all: "Барлығы",
    restaurants: "Мейрамханалар",
    hotels: "Қонақүйлер",
    cafes: "Кафелер",
    toilets: "Дәретханалар",
    discover: "Қазақстанды аш",
    subtitle: "Қазақстанның таңғажайып жерлерін зертте",
    learnMore: "Толығырақ",
    addToRoute: "Маршрутқа қосу"
  },

  en: {
    home: "Home",
    attractions: "Attractions",
    map: "Map",
    routes: "Routes",
    planner: "Trip planner",
    reviews: "Reviews",
    search: "Search",
    all: "All",
    restaurants: "Restaurants",
    hotels: "Hotels",
    cafes: "Cafes",
    toilets: "Restrooms",
    discover: "Discover Kazakhstan",
    subtitle: "Explore the amazing places of Kazakhstan",
    learnMore: "Learn more",
    addToRoute: "Add to route"
  }
};

let currentLanguage =
  localStorage.getItem("qazaqtrip-language") || "ru";

function translate(key) {
  return translations[currentLanguage]?.[key] ||
         translations.ru[key] || key;
}

function changeLanguage(language) {
  if (!translations[language]) return;

  currentLanguage = language;
  localStorage.setItem("qazaqtrip-language", language);
  applyTranslations();
}
