import { Post } from './src/entities/post.entity';
import { User } from './src/entities/user.entity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions & {
  seeds: string[];
  factories: string[];
} = {
  type: 'postgres',
  database: 'admin',
  host: 'localhost',
  username: 'admin',
  password: 'admin',
  port: 5432,
  entities: [User, Post],

  seeds: ['./src/seeds/**/*{.ts,.js}'],
  factories: ['./src/factories/**/*{.ts,.js}'],

  synchronize: true,
};

export default config;
