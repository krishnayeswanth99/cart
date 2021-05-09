import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = "/api/products";

  constructor(private httpClient: HttpClient) { }

  get(): Promise<Array<IProduct>>{
    return this.httpClient.get(this.productUrl)
            .toPromise()
            .then(this.json)
            .catch(this.error);
  }
  create(product: Product): Promise<IProduct>{
    return this.httpClient.post(this.productUrl, product)
            .toPromise()
            .then(this.json)
            .catch(this.error);
  }
  delete(id: string | null): Promise<any>{
    return this.httpClient.delete(`${this.productUrl}/${id}`)
            .toPromise()
            .then(this.json)
            .catch(this.error);
  }
  private error(error: any){
    let msg = (error.message) ? error.message : 
        error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
    console.log(msg);
  }
  private json(msg: any){
    console.log(msg);
    return msg;
  }
}
