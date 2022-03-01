import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
HttpClient

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  // create resturant using post method
  createResturant(data:any){
    return this.http.post("http://localhost:3000/resturants/", data);
  }


  // get resturant data using get method
  getData(){
    return this.http.get<HttpResponse<any>[]>("http://localhost:3000/resturants");
  }

  // update resturant data using put method
  UpdateResturant(data:any , id:Number){
    return this.http.put("http://localhost:3000/resturants/"+id,data);
  }

  // delete resturant data using delete method
  deleteResturant(id:Number)
  {
     return this.http.delete("http://localhost:3000/resturants/"+id)
  }


}
