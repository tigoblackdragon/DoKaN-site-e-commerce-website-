import { Component, inject, NgModule, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute  } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit{

  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _OrdersService= inject(OrdersService)

  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });


  idCart:string|null=""
  isLoading:boolean=false;


ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next: (pMap) => {
   this.idCart=pMap.get('id');
   
  }
 });

}


  orderSubmit(){
this._OrdersService.checkOut(this.idCart, this.orders.value).subscribe({
  next: (res) => {
    console.log(res);
    this.isLoading=true;
    if(res.status==='success'){
      
      setTimeout(() => {
        this.isLoading=false;
        res.session.url;
        window.open(res.session.url,'_self')
      }, 5000);
    }
  },
  error: (err) => {
    console.error(err);
  }
 })

}}