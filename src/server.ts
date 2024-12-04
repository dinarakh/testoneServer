import express, { Request, Response } from 'express';
import cors from 'cors'; // Для решения проблемы с CORS
import bodyParser from 'body-parser'; // Для парсинга JSON
import { router as contactRoutes } from './routes/contactRoutes'; // Подключаем маршруты

const app = express();
const PORT = 5000;

app.use(cors()); // Разрешаем кросс-доменные запросы
app.use(bodyParser.json()); // Для парсинга тела запроса как JSON

// Подключаем маршруты для работы с контактами
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
