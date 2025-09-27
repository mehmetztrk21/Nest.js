import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppDataSource } from 'src/app.module';
import { Country } from 'src/entities/country.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CountryService {
  private manager: EntityManager;
  private repo: Repository<Country>;
  constructor() {
    this.manager = AppDataSource.manager;
    this.repo = AppDataSource.getRepository(Country);
  }

  async createCountryWithEm() {
    //bu şekilde direkt manager ile de işlem yapabiliriz.
    const country = this.manager.create(Country, { name: 'Türkiye' });
    await this.manager.save(country);
    //manager.find(Country);
    this.manager.findOne(Country, {});
    this.manager.find(Country, { where: { name: 'Türkiye' } });
    this.manager.query('SELECT * FROM country');

    return country;
  }
}
