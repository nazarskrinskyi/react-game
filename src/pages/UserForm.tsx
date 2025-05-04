import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
    name: string;
    email: string;
};

const UserForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        const savedName = localStorage.getItem("userName");
        if (savedEmail) {
            setUserEmail(savedEmail);
            setUserName(savedName);
            setIsLoggedIn(true);
        }
    }, []);

    const onSubmit = (data: FormData) => {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userName", data.name);
        setUserEmail(data.email);
        setUserName(data.name);
        setIsLoggedIn(true);
        navigate("/");
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        setUserEmail(null);
        setUserName(null);
        setIsLoggedIn(false);
        navigate("/start");
    };

    if (isLoggedIn) {
        return (
            <div className="max-w-md mx-auto p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">👋 Вітаємо, {userName || userEmail}!</h2>
                <p className="text-gray-600 mb-4">Ви увійшли як {userEmail}</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                >
                    🔒 Вийти
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">🔐 Увійдіть, щоб продовжити</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block mb-2 font-medium">Ім’я</label>
                <input
                    className="w-full border p-2 mb-2"
                    {...register("name", { required: "Це поле обов’язкове" })}
                    placeholder="Ваше ім’я"
                />
                {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                )}

                <label className="block mb-2 font-medium">Email</label>
                <input
                    type="email"
                    className="w-full border p-2 mb-2"
                    {...register("email", {
                        required: "Email обов’язковий",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Невірний формат email"
                        }
                    })}
                    placeholder="Ваш email"
                />
                {errors.email && (
                    <p className="text-red-500 mb-4">{errors.email.message}</p>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                    ▶️ Почати гру
                </button>
            </form>
        </div>
    );
};

export default UserForm;
