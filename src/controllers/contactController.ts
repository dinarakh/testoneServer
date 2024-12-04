import { Request, Response } from 'express';
import { Contact } from '../models/Contact';

// Создание нового контакта
export const createContact = async (req: Request, res: Response) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Имя и телефон обязательны!' });
  }

  try {
    const newContact = await Contact.create({ name, phone }); // создаём новый контакт
    res.status(201).json(newContact); // Отправляем новый контакт в ответе
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Не удалось создать контакт' });
  }
};

// Получение всех контактов
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts); // Отправляем все контакты
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Не удалось получить контакты' });
  }
};

// Получение контакта по ID
export const getContactById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByPk(id); // Ищем контакт по ID
    if (!contact) {
      return res.status(404).json({ message: 'Контакт не найден' });
    }
    res.status(200).json(contact); // Отправляем найденный контакт
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Не удалось получить контакт' });
  }
};

// Обновление контакта
export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'Имя и телефон обязательны!' });
  }

  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Контакт не найден' });
    }

    // Обновляем контакт
    contact.name = name;
    contact.phone = phone;
    await contact.save(); // Сохраняем обновленные данные

    res.status(200).json(contact); // Отправляем обновленный контакт
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Не удалось обновить контакт' });
  }
};

// Удаление контакта
export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Контакт не найден' });
    }

    await contact.destroy(); // Удаляем контакт
    res.status(200).json({ message: 'Контакт удален' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Не удалось удалить контакт' });
  }
};
