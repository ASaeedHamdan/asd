import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormGroup ,FormBuilder ,Validator, Validators} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  formValue: FormGroup;
  actionBtn : string = "Save";
  statement :string = "add Resturant data";

  constructor(

    public translate:TranslateService ,
    private formBuilder:FormBuilder ,
    private ser :ApiService ,
    private dialogRef :MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
  ) { }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: ['' , Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      adress: ['', Validators.required],
      services: ['', Validators.required],
    });
    if(this.editData){

      this.actionBtn = "Update";
      this.statement = "update Resturant data";
      this.formValue.controls['name'].setValue(this.editData.name);
      this.formValue.controls['email'].setValue(this.editData.email);
      this.formValue.controls['mobile'].setValue(this.editData.mobile);
      this.formValue.controls['adress'].setValue(this.editData.adress);
      this.formValue.controls['services'].setValue(this.editData.services);
    }
    console.log(this.editData);

  }


  addResturant(){

    if(!this.editData){
      if(this.formValue.valid){
        this.ser.createResturant(this.formValue.value).subscribe(res=>{
          alert("patient added successfully 😊😊");
          this.formValue.reset();
          this.dialogRef.close("save");// close form after save data
        });
      }
    }else{
          this.updateData();
    }

  }

  updateData(){
    this.ser.UpdateResturant(this.formValue.value , this.editData.id).subscribe({
      next:(res)=>{
        alert("resturant updated successfully 😊😊");
        this.formValue.reset();
        this.dialogRef.close("update");// close form after update data
      },
      error:(err)=>{"error while updating data 😢😢"}
    })
  }

}
