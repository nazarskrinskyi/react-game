import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormData = {
    username: string;
};

const UserForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const navigate = useNavigate();

    const onSubmit = (data: FormData) => {
        console.log("User:", data.username);
        localStorage.setItem("username", data.username);
        navigate("/");
    };

    return (
        <div className="max-w-md mx-auto p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">👤 Введіть своє ім’я</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block mb-2 font-medium">Ім’я користувача</label>
                <input
                    className="w-full border p-2 mb-2"
                    {...register("username", { required: "Це поле обов’язкове" })}
                    placeholder="Ваше ім’я"
                />
                {errors.username && (
                    <p className="text-red-500 mb-4">{errors.username.message}</p>
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
