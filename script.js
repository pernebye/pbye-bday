// Настройки пароля
const correctDay = 30;
const correctMonth = 12;
const correctYear = 2003;

const nameInput = document.getElementById('nameInput');
const dayInput = document.getElementById('dayInput');
const monthInput = document.getElementById('monthInput');
const yearInput = document.getElementById('yearInput');
const loginBtn = document.getElementById('loginBtn');
const invitationSection = document.getElementById('invitationSection');
const loginSection = document.getElementById('loginSection');
const comeBtn = document.getElementById('comeBtn');

loginBtn.addEventListener('click', () => {
    validateAndLogin();
});

comeBtn.addEventListener('click', () => {
    const savedName = localStorage.getItem('username') || 'Неизвестный';
    // Здесь можно отправить данные на сервер или обработать иначе
    console.log('Информация о госте:', { name: savedName, status: 'Приду' });
    alert('Спасибо за подтверждение! Информация отправлена.');
});

function validateAndLogin() {
    const username = nameInput.value.trim();
    const dayVal = parseInt(dayInput.value, 10);
    const monthVal = parseInt(monthInput.value, 10);
    const yearVal = parseInt(yearInput.value, 10);

    if (!username) {
        alert('Введите имя.');
        return;
    }

    if (dayVal === correctDay && monthVal === correctMonth && yearVal === correctYear) {
        // Сохраняем имя и факт входа
        localStorage.setItem('username', username);
        localStorage.setItem('access', 'granted');

        // Переходим к приглашению
        loginSection.style.display = 'none';
        invitationSection.style.display = 'block';
    } else {
        alert('Неверная дата рождения. Доступ запрещен.');
    }
}

// Автоматическое переключение полей ввода
dayInput.addEventListener('input', () => {
    if (dayInput.value.length === 2) {
        monthInput.focus();
    }
});

monthInput.addEventListener('input', () => {
    if (monthInput.value.length === 2) {
        yearInput.focus();
    }
});

yearInput.addEventListener('input', () => {
    if (yearInput.value.length === 4) {
        validateAndLogin();
    }
});

function sendTelegramNotification(name) {
    fetch('https://bday-bot-l747.onrender.com/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    }).catch((error) => console.error('Ошибка отправки уведомления:', error));
}

comeBtn.addEventListener('click', () => {
    const savedName = localStorage.getItem('username') || 'Неизвестный';
    sendTelegramNotification(savedName);
    alert('Спасибо за подтверждение! Уведомление отправлено.');
});

