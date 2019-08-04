import { Injectable } from "@nestjs/common";

import {Product} from './product.model';

@Injectable()
export class ProductsService{
    products:Product[] = [];

    insertProduct(title:string, desc: string, price: number) : string {
        const prodId = new Date().toString();
        const newProduct = new Product(prodId,title,desc,price);
        this.products.push(newProduct); 
        console.log(this.products);
        return prodId;
    }
}