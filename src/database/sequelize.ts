// Пример правильного экспорта
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '0507',
  database: 'test_db',
});

export { sequelize };  // именованный экспорт
