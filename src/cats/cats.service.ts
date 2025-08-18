import { Injectable } from '@nestjs/common';

type Cat = {
  id: string;
  name: string;
  age: number;
  breed?: string;
};

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  findAll(age?: number, breed?: string) {
    return this.cats.filter((c) => {
      if (age && c.age !== age) return false;
      if (breed && c.breed !== breed) return false;
      return true;
    });
  }

  findOne(id: string) {
    return this.cats.find((c) => (c.id = id));
  }

  create(cat: Omit<Cat, 'id'>) {
    const newCat = { id: `${Date.now()}`, ...cat };
    this.cats.push(newCat);
    return newCat;
  }
}
