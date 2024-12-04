import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/sequelize'; // Подключаем sequelize

// Определяем интерфейс для контакта, что должно быть в базе данных
interface ContactAttributes {
  id: number;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Для создания нового контакта id не нужен (он autoIncrement)
interface ContactCreationAttributes extends Optional<ContactAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public name!: string;
  public phone!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Имя обязательно
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, // Телефон обязателен
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false, // Поле временной метки
      defaultValue: DataTypes.NOW, // по умолчанию будет текущее время
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false, // Поле временной метки
      defaultValue: DataTypes.NOW, // по умолчанию будет текущее время
    },
  },
  {
    sequelize,
    tableName: 'contacts',
    timestamps: true, // Указываем, что будут использоваться временные метки
  }
);
