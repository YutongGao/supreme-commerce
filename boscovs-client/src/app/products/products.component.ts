import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../shared/models/product';
import {MatTableDataSource, MatDialog} from '@angular/material';
import {Router} from '@angular/router';
// import {ProductDeleteConfirmComponent} from './product-delete-confirm/product-delete-confirm.component';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns = ['name', 'brand', 'price', 'stock', 'image', 'operation'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  constructor(
    private ps: ProductsService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.ps.getProducts()
      .subscribe(res => {
        this.dataSource.data = res;
      });

  }

  // onEdit(name) {
  //   this.router.navigate([`/products/${name}`]);
  // }
  //
  // onDelete(name) {
  //   let dialogRef = this.dialog.open(ProductDeleteConfirmComponent, {
  //     width: '300px',
  //     data: {name}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(name => {
  //     if (name) {
  //       this.ps.deleteProducts(name)
  //         .pipe(
  //           map(res => {
  //             return res.success;
  //           })
  //         ).subscribe(res => {
  //         if (res) {
  //           this.ps.getProducts()
  //             .subscribe(data => this.dataSource.data = data);
  //         }
  //       });
  //     }
  //   });
  //
  // }

}
