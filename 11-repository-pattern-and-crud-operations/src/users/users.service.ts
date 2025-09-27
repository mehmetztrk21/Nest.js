import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('MYSQL_CONNECTION') private mysqlConnection: DataSource,
  ) {}

  async getUsers() {
    return await this.mysqlConnection.query('SELECT * FROM users');
  }
}
