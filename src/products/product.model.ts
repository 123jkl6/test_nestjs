import { StringLiteral } from '@babel/types';

export class Product {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public price: number,
  ) {}
}
