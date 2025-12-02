// Данные рецептов
const recipes = [
    {
        id: 1,
        title: "Авокадо тост с яйцом",
        description: "Питательный завтрак с полезными жирами и белками",
        image: "https://kimi-web-img.moonshot.cn/img/www.vitacup.com/97cfca445aaea6e9f9bd493d72291430a439c614.JPG",
        category: "breakfast",
        time: "10 мин",
        calories: "320 ккал"
    },
    {
        id: 2,
        title: "Киноа салат с овощами",
        description: "Легкий обед с полным набором аминокислот",
        image: "https://kimi-web-img.moonshot.cn/img/greenhealthycooking.com/4db9253d8c87dec7af1d7d0a454b8c72c6235fe7.jpg",
        category: "lunch",
        time: "15 мин",
        calories: "380 ккал"
    },
    {
        id: 3,
        title: "Лосось на гриле",
        description: "Ужин с омега-3 жирными кислотами и овощами",
        image: "https://kimi-web-img.moonshot.cn/img/www.eatingwell.com/ff56686f339e7fe8586e6db1838c552bbf34efa2.jpg",
        category: "dinner",
        time: "25 мин",
        calories: "450 ккал"
    },
    {
        id: 4,
        title: "Боул с ягодами",
        description: "Полезный перекус с антиоксидантами",
        image: "https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/5ac289b240b86b65507bba30ee7f69afa036bb0d.JPG",
        category: "snack",
        time: "5 мин",
        calories: "180 ккал"
    },
    {
        id: 5,
        title: "Овсянка с фруктами",
        description: "Классический завтрак с клетчаткой и витаминами",
        image: "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/5b0de7476509f5f34d4ee8bbabd626cd355d89ed.jpg",
        category: "breakfast",
        time: "8 мин",
        calories: "280 ккал"
    },
    {
        id: 6,
        title: "Мисо суп",
        description: "Легкий обед с пробиотиками и белком",
        image: "https://kimi-web-img.moonshot.cn/img/i0.wp.com/59e0ea0fcf5b4a395aef078f23a8e89f0ec7f219.jpg",
        category: "lunch",
        time: "12 мин",
        calories: "220 ккал"
    },
    {
        id: 7,
        title: "Куриная грудка",
        description: "Постный ужин с высоким содержанием белка",
        image: "https://kimi-web-img.moonshot.cn/img/bliibgsund.ch/0d3220e5b3d4d351eb2bce6a1ae25caa8b039714.jpg",
        category: "dinner",
        time: "20 мин",
        calories: "350 ккал"
    },
    {
        id: 8,
        title: "Греческий йогурт",
        description: "Простой перекус с пробиотиками",
        image: "https://kimi-web-img.moonshot.cn/img/eatmoreart.org/08af64fc3040d19eab2160236d7ff95bb3ea6ddd.jpg",
        category: "snack",
        time: "2 мин",
        calories: "120 ккал"
    },
    {
        id: 9,
        title: "Смузи зеленый",
        description: "Энергетический завтрак с витаминами и минералами",
        image: "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/e58332c3e01aaf36bf0f929cb9f712f7a314e5b5.jpg",
        category: "breakfast",
        time: "5 мин",
        calories: "250 ккал"
    }
];

// Переменные для трекера привычек
let habitProgress = {
    water: 0,
    vegetables: 0,
    exercise: 0,
    sleep: 0,
    mindful: 0
};

const habitTargets = {
    water: 8,
    vegetables: 5,
    exercise: 30,
    sleep: 8,
    mindful: 3
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeRecipes();
    initializeHabits();
    initializeCarousel();
    initializeNavigation();
    loadHabitData();
});

// Навигация
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Плавная прокрутка
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Мобильное меню
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Прокрутка к секции
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Калькулятор калорий
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);

    if (!age || !weight || !height) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Формула Миффлина-Сан Жеора
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const calories = Math.round(bmr * activity);
    
    // Расчет БЖУ (30% белки, 30% жиры, 40% углеводы)
    const protein = Math.round((calories * 0.30) / 4);
    const fat = Math.round((calories * 0.30) / 9);
    const carbs = Math.round((calories * 0.40) / 4);

    // Отображение результатов
    document.getElementById('calories').textContent = calories;
    document.getElementById('protein-value').textContent = protein + 'г';
    document.getElementById('fat-value').textContent = fat + 'г';
    document.getElementById('carbs-value').textContent = carbs + 'г';

    // Анимация полосок
    setTimeout(() => {
        document.getElementById('protein-bar').style.width = '30%';
        document.getElementById('fat-bar').style.width = '30%';
        document.getElementById('carbs-bar').style.width = '40%';
    }, 100);

    // Показать результаты с анимацией
    const results = document.getElementById('results');
    results.style.opacity = '0';
    results.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        results.style.transition = 'all 0.5s ease';
        results.style.opacity = '1';
        results.style.transform = 'translateY(0)';
    }, 200);
}

// Инициализация рецептов
function initializeRecipes() {
    const recipesGrid = document.getElementById('recipes-grid');
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        recipesGrid.appendChild(recipeCard);
    });

    // Инициализация фильтров
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterRecipes(filter);
            
            // Обновить активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Создание карточки рецепта
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.setAttribute('data-category', recipe.category);
    
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-description">${recipe.description}</p>
            <div class="recipe-meta">
                <span class="recipe-time">⏱️ ${recipe.time}</span>
                <span class="recipe-calories">🔥 ${recipe.calories}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Фильтрация рецептов
function filterRecipes(category) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Инициализация карусели советов
function initializeCarousel() {
    let currentTip = 0;
    const tips = document.querySelectorAll('.tip-card');
    const indicators = document.querySelectorAll('.indicator');
    
    // Автоматическое переключение
    setInterval(() => {
        changeTip(1);
    }, 5000);
    
    window.changeTip = function(direction) {
        tips[currentTip].classList.remove('active');
        tips[currentTip].classList.add('prev');
        indicators[currentTip].classList.remove('active');
        
        currentTip = (currentTip + direction + tips.length) % tips.length;
        
        tips[currentTip].classList.remove('prev');
        tips[currentTip].classList.add('active');
        indicators[currentTip].classList.add('active');
    };
    
    window.showTip = function(index) {
        tips[currentTip].classList.remove('active');
        tips[currentTip].classList.add('prev');
        indicators[currentTip].classList.remove('active');
        
        currentTip = index;
        
        tips[currentTip].classList.remove('prev');
        tips[currentTip].classList.add('active');
        indicators[currentTip].classList.add('active');
    };
}

// Инициализация трекера привычек
function initializeHabits() {
    const checkboxes = document.querySelectorAll('.habit-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const habit = this.getAttribute('data-habit');
            updateHabitProgress(habit, this.checked);
        });
    });
}

// Обновление прогресса привычки
function updateHabitProgress(habit, isChecked) {
    const progressBar = document.getElementById(`${habit}-progress`);
    const progressText = document.getElementById(`${habit}-text`);
    
    if (isChecked) {
        habitProgress[habit] = habitTargets[habit];
        progressBar.style.width = '100%';
        progressText.textContent = `${habitTargets[habit]}/${habitTargets[habit]} ${getHabitUnit(habit)}`;
    } else {
        habitProgress[habit] = 0;
        progressBar.style.width = '0%';
        progressText.textContent = `0/${habitTargets[habit]} ${getHabitUnit(habit)}`;
    }
    
    updateOverallProgress();
    saveHabitData();
}

// Получение единицы измерения для привычки
function getHabitUnit(habit) {
    const units = {
        water: 'стаканов',
        vegetables: 'порций',
        exercise: 'мин',
        sleep: 'ч',
        mindful: 'раз'
    };
    return units[habit];
}

// Обновление общего прогресса
function updateOverallProgress() {
    const totalProgress = Object.values(habitProgress).reduce((sum, progress) => sum + progress, 0);
    const totalTargets = Object.values(habitTargets).reduce((sum, target) => sum + target, 0);
    const percentage = Math.round((totalProgress / totalTargets) * 100);
    
    const progressFill = document.getElementById('overall-progress-fill');
    const percentageText = document.getElementById('overall-percentage');
    
    const circumference = 2 * Math.PI * 50; // радиус = 50
    const offset = circumference - (percentage / 100) * circumference;
    
    progressFill.style.strokeDashoffset = offset;
    percentageText.textContent = percentage + '%';
}

// Сохранение данных в localStorage
function saveHabitData() {
    localStorage.setItem('habitProgress', JSON.stringify(habitProgress));
}

// Загрузка данных из localStorage
function loadHabitData() {
    const saved = localStorage.getItem('habitProgress');
    if (saved) {
        habitProgress = JSON.parse(saved);
        
        // Обновить UI
        Object.keys(habitProgress).forEach(habit => {
            const checkbox = document.querySelector(`[data-habit="${habit}"]`);
            const progress = habitProgress[habit];
            const target = habitTargets[habit];
            
            if (progress > 0) {
                checkbox.checked = true;
                const progressBar = document.getElementById(`${habit}-progress`);
                const progressText = document.getElementById(`${habit}-text`);
                
                progressBar.style.width = '100%';
                progressText.textContent = `${progress}/${target} ${getHabitUnit(habit)}`;
            }
        });
        
        updateOverallProgress();
    }
}

// Анимация при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдение за элементами
    const animatedElements = document.querySelectorAll('.principle-card, .recipe-card, .habit-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Инициализация анимаций при скролле
setTimeout(initScrollAnimations, 100);