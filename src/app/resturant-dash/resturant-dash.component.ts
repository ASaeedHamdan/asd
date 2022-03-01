import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ResturantData } from './resturant.model';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
AppComponent




@Component({
  selector: 'resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.css'],
})
export class ResturantDashComponent implements OnInit {

  resturantModelObject:ResturantData = new ResturantData;
  allResturantData:any={};
  loadArabic;

  displayedColumns: string[] = ['id','name', 'email', 'mobile', 'adress','services','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private ser:ApiService ,private dialog:MatDialog, public translate:TranslateService , private AppCom:AppComponent)
  {
    this.loadArabic = AppCom.loadArabic
  }

  ngOnInit(): void
  {
   this.getallResturants()
  }
   /* get all patients */
   getallResturants(){
    this.ser.getData().subscribe(
        {
          next:(res)=>
          {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                console.log(res);

          },
          error:(err)=>{ "error while getting data"},
        }

    )
  }


  /* show pateint data row by Mat_Data_Dialog used in diaolg component */
  editResturant(row){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === "update"){
          this.getallResturants();
      }
    })
  }



  /* delete patient */
deleteresturant(id:Number){
  this.ser.deleteResturant(id).subscribe({
    next:(res)=>{
      alert(this.loadArabic? "  تم حذف المطعم بنجاح 😊😊": "resturant deleted successfully 😊😊");
      this.getallResturants();

    },
    error:(err)=>{

    alert( this.loadArabic? " عذرا حدث  خطا عند حذف البيانات 😢😢": "error while deleting data 😢😢")  ;
    }
  })
}

   /*open dialog to add new patient  */
   openDialog() {
    this.dialog.open(DialogComponent, {
    width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
          this.getallResturants();
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

