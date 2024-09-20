import { Iorders } from './../../core/interfaces/iorders';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe, SlicePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit{

private readonly _OrdersService=inject (OrdersService)
ordersDetails: Iorders= {} as Iorders;

  ngOnInit(): void {
    this._OrdersService.getAllOrders().subscribe({
      next: (res) => 
      {console.log(res);
        this.ordersDetails=res}
      ,
      error: (err) => console.error(err)
    })
      
  }
}
