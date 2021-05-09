import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct, Product } from 'src/app/entities/product.model';
import { ProductService } from 'src/app/entities/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm!: FormGroup;
  name: string = '';
  brand: string = '';
  error: boolean = false;

  @Output() createdProduct = new EventEmitter<IProduct>();

  constructor(protected productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      brand: new FormControl(this.brand, Validators.required)
    });
  }
  hideError(){
    this.error=false;
  }
  onSubmit(){
    const product = new Product(this.productForm.value['name'],this.productForm.value['brand'],null);
    this.productService.create(product).then((res: IProduct)=>{
      if(res == undefined){
        this.error = true;
      }else{
        this.error = false;
        this.createdProduct.emit(res);
        this.productForm.reset();
      }
    });
  }

}
