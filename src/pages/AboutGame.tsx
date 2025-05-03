import React from "react";

const AboutGame: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 text-white-800">
            <h1 className="text-3xl font-bold mb-4 text-center">🎮 Про гру "2048"</h1>
            <p className="mb-4">
                <strong>"2048"</strong> — це затягуюча логічна гра, яка поєднує прості правила з глибоким стратегічним мисленням.
                Вона була створена в 2014 році і миттєво здобула популярність у всьому світі.
            </p>
            <p className="mb-4">
                Ваша мета — поєднувати однакові числові плитки на полі 4x4, щоб отримати плитку з числом <strong>2048</strong>.
                Але це не так просто, як здається! Кожен хід додає нову плитку, а місця стає все менше.
            </p>
            <p className="mb-4">
                У нашій реалізації ви можете грати за допомогою стрілок на клавіатурі або натискаючи кнопки управління.
                Гра зберігає дух оригіналу, але реалізована на сучасному стеку: <strong>React + Redux + TypeScript + Vite</strong>.
            </p>
            <p className="mt-6 italic text-sm text-white-600 text-center">
                Порада: не намагайтеся одразу дістати 2048 — думайте на кілька ходів наперед 😉
            </p>
        </div>
    );
};

export default AboutGame;
