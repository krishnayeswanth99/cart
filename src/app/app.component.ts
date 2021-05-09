import { Component, OnInit } from '@angular/core';
import { IProduct } from './entities/product.model';
import { StatusService } from './running/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular-Node-Cart';
  status = "DOWN";
  createdProduct!: IProduct;

  constructor(protected statusService: StatusService){}

  ngOnInit(){
    this.statusService.getStatus()
          .then((res: any)=>{
            this.status=res.status;
          });
  }
  onCreatedProduct(createdProduct: IProduct){
    this.createdProduct = createdProduct;
  }
}
