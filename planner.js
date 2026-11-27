
// ========================================
// QAZAQTRIP — SMART TRAVEL PLANNER
// ========================================


// ОРИЕНТИРОВОЧНЫЕ ДЕМО-РАСЦЕНКИ
// Это не реальные тарифы перевозчиков.

const transportPrices = {

    car: {
        name: "Автомобиль",
        price: 18000
    },

    bus: {
        name: "Автобус",
        price: 8000
    },

    train: {
        name: "Поезд",
        price: 10000
    },

    taxi: {
        name: "Такси",
        price: 15000
    }

};


const accommodationPrices = {

    hotel: {
        name: "Отель",
        price: 16000
    },

    hostel: {
        name: "Хостел",
        price: 6000
    },

    apartment: {
        name: "Апартаменты",
        price: 12000
    },

    camping: {
        name: "Кемпинг",
        price: 4000
    },

    none: {
        name: "Без проживания",
        price: 0
    }

};


// ========================================
// MONEY FORMAT
// ========================================

function formatMoney(amount) {

    return Math.round(amount)
        .toLocaleString("ru-RU") + " ₸";

}


// ========================================
// CREATE TRIP
// ========================================

function createTrip(event) {

    event.preventDefault();

    const destination =
        document.getElementById("tripDestination").value;

    const days =
        Number(document.getElementById("tripDays").value);

    const people =
        Number(document.getElementById("tripPeople").value);

    const budget =
        Number(document.getElementById("tripBudget").value);

    const transportKey =
        document.getElementById("tripTransport").value;

    const stayKey =
        document.getElementById("tripStay").value;


    // VALIDATION

    if (
        !Number.isInteger(people) ||
        people < 1 ||
        people > 20
    ) {

        alert("Количество людей должно быть от 1 до 20.");

        return;

    }


    if (
        !Number.isFinite(budget) ||
        budget < 1000
    ) {

        alert("Введите корректный бюджет.");

        return;

    }


    // TRANSPORT SELECTION

    let transport;

    if (transportKey === "any") {

        transport = Object.values(transportPrices)
            .reduce((a, b) =>
                a.price < b.price ? a : b
            );

    } else {

        transport = transportPrices[transportKey];

    }


    // ACCOMMODATION SELECTION

    let stay;

    if (stayKey === "any") {

        stay = Object.values(accommodationPrices)
            .filter(item => item.price > 0)
            .reduce((a, b) =>
                a.price < b.price ? a : b
            );

    } else {

        stay = accommodationPrices[stayKey];

    }


    // COST CALCULATION

    const transportCost =
        transport.price * people;

    const accommodationCost =
        stay.price * Math.max(days - 1, 0) * people;

    const foodCost =
        5000 * days * people;

    const entertainmentCost =
        4000 * days * people;

    const total =
        transportCost +
        accommodationCost +
        foodCost +
        entertainmentCost;


    // SELECTED PLACES

    const selectedPlaces =
        window.selectedRoutePlaces || [];

    const destinationPlaces = selectedPlaces.length
        ? selectedPlaces.map(place => place.name)
        : [
            "Прогулка по выбранному направлению",
            "Знакомство с природой региона",
            "Свободное время и отдых"
        ];


    // SELECTED INTERESTS

    const interests = [
        ...document.querySelectorAll(
            'input[name="interest"]:checked'
        )
    ].map(item => item.parentElement.textContent.trim());


    // GENERATE DAILY SCHEDULE

    let schedule = "";

    for (let day = 0; day < days; day++) {

        const first =
            destinationPlaces[(day * 2) % destinationPlaces.length];

        const second =
            destinationPlaces[
                (day * 2 + 1) % destinationPlaces.length
            ];

        schedule += `

            <div class="trip-day">

                <strong>День ${day + 1}</strong>

                <p>
                    Утро — ${first}<br>
                    День — ${second}<br>
                    Вечер — отдых и свободное время
                </p>

            </div>

        `;

    }


    // BUDGET CHECK

    let budgetMessage;

    if (total <= budget) {

        budgetMessage = `
            ✓ По предварительной оценке,
            поездка укладывается в бюджет.
            Остаток: ${formatMoney(budget - total)}.
        `;

    } else {

        budgetMessage = `
            ⚠ Поездка превышает бюджет
            на ${formatMoney(total - budget)}.
            Попробуйте выбрать более экономичный вариант.
        `;

    }


    // DISPLAY RESULT

    const result =
        document.getElementById("plannerResult");

    result.innerHTML = `

        <div class="trip-result">

            <p class="eyebrow">
                YOUR PERSONAL JOURNEY
            </p>

            <h3>Путешествие: ${destination}</h3>

            <p class="trip-subtitle">
                ${days} дней · ${people} путешественников
            </p>


            <div class="budget-total">

                <span>ОБЩАЯ ПРЕДВАРИТЕЛЬНАЯ СТОИМОСТЬ</span>

                <strong>
                    ${formatMoney(total)}
                </strong>

            </div>


            <div class="budget-line">
                <span>Транспорт: ${transport.name}</span>
                <strong>${formatMoney(transportCost)}</strong>
            </div>

            <div class="budget-line">
                <span>Проживание: ${stay.name}</span>
                <strong>${formatMoney(accommodationCost)}</strong>
            </div>

            <div class="budget-line">
                <span>Питание</span>
                <strong>${formatMoney(foodCost)}</strong>
            </div>

            <div class="budget-line">
                <span>Развлечения</span>
                <strong>${formatMoney(entertainmentCost)}</strong>
            </div>


            <h3 style="margin-top:25px">
                Расписание поездки
            </h3>

            ${schedule}


            <div class="budget-line">
                <span>Ваш бюджет</span>
                <strong>${formatMoney(budget)}</strong>
            </div>


            <div class="budget-warning">

                ${budgetMessage}

                <br><br>

                Интересы: ${
                    interests.length
                    ? interests.join(", ")
                    : "Не выбраны"
                }

                <br><br>

                Цены являются демонстрационными оценками.
                Расстояния, сезонность, билеты и стоимость
                проживания необходимо проверить отдельно.

            </div>

        </div>

    `;

}


// ========================================
// FORM EVENT
// ========================================

document
    .getElementById("plannerForm")
    .addEventListener("submit", createTrip);
