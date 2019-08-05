import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  //not stored in memory anymore.
  //private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private async findProductById(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Product not found');
    }
    console.log(product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async insertProduct(title: string, desc: string, price: number) {
    const prodId = Date.now().toString();
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const result = await newProduct.save();
    // this.products.push(newProduct);
    // console.log(this.products);
    console.log(result);
    return result;
  }

  async getAllProducts() {
    const products = await this.productModel.find().exec();
    console.log(products);
    return products.map(prod => {
      return {
        id: prod.id,
        title: prod.title,
        description: prod.description,
        price: prod.price,
      };
    });
  }

  async getProductById(prodId: string) {
    const product = await this.findProductById(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProductById(productId);

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    return await updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    console.log(result);
    if (result.n === 0) {
      throw new NotFoundException('Could not find product to delete. ');
    }
  }
}
