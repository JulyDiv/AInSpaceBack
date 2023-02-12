import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validation.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:787299Reotyrj@cluster0.kyaiihy.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok");
  })
  .catch((err) => {
    console.log("DB Error", err);
  });

// Создала экспресс приложение
const app = express();

// Хранилище картинок
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Научила express читать json формат
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

// Когда будет запрос на этот адрес, будет что-то происходить
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

// Получение информации обо мне
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);

// Получение всех статей
app.get("/posts", PostController.getAll);

app.get("/posts/tags", PostController.getLastTags);

// Получение одного поста по id
app.get("/posts/:id", PostController.getOne);

// Создание поста
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);

// Удаление поста
app.delete("/posts/:id", checkAuth, PostController.remove);

// Обновление поста
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

// Если сервер не смог запуститься, то выдаст ошибкуб если запустился, то вернет "ОК"
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
