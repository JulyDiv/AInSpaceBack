import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверная почта").isEmail(),
  body("password", "Пароль минимум 5 символов").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Неверная почта").isEmail(),
  body("password", "Пароль минимум 5 символов").isLength({ min: 5 }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 3 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 3 }).isString(),
  body("tags", "Неверный формат тэгов (укажите массив)").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
