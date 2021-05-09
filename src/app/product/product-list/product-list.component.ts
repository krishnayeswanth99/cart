import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entities/product.model';
import { ProductService } from 'src/app/entities/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  products: Array<IProduct> = [];
  @Input() product!: IProduct;

  constructor(protected productService: ProductService) { }

  ngOnInit(): void {
    this.loadAll();
  }
  ngOnChanges(): void{
    if(this.product !== null){
      this.products.push(this.product);
    }
  }
  delete(id: string | null){
    // if(id==null) return;
    this.productService.delete(id).then((res: any) => this.loadAll());
  }
  private loadAll(){
    this.productService.get()
        .then((res: Array<IProduct>) => {
          this.products = res;
          // console.log(this.products[0].name);
        });
  }
}
