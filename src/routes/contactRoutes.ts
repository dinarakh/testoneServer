import express, { Request, Response } from 'express';
import { Contact } from '../models/Contact'; // Модель Contact

const router = express.Router();

// Получить все контакты
router.get('/contacts', async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll(); // Получаем все контакты из базы
    res.status(200).json(contacts); // Отправляем контакты в ответе
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить контакты' });
  }
});

// Добавить новый контакт
router.post('/contacts', async (req: Request, res: Response) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Имя и телефон обязательны!' });
  }

  try {
    const newContact = await Contact.create({ name, phone }); // Создаём новый контакт в базе
    res.status(201).json(newContact); // Возвращаем только что созданный контакт
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать контакт' });
  }
});

// Обновить контакт
router.put('/contacts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Имя и телефон обязательны!' });
  }

  try {
    const contact = await Contact.findByPk(id); // Ищем контакт по ID
    if (!contact) {
      return res.status(404).json({ message: 'Контакт не найден' });
    }

    // Обновляем контакт
    contact.name = name;
    contact.phone = phone;
    await contact.save(); // Сохраняем изменения в базе

    res.status(200).json(contact); // Отправляем обновлённый контакт
  } catch (error) {
    res.status(500).json({ message: 'Не удалось обновить контакт' });
  }
});

// Удалить контакт
router.delete('/contacts/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByPk(id); // Ищем контакт по ID
    if (!contact) {
      return res.status(404).json({ message: 'Контакт не найден' });
    }
    await contact.destroy(); // Удаляем контакт
    res.status(200).json({ message: 'Контакт удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Не удалось удалить контакт' });
  }
});

export { router };
