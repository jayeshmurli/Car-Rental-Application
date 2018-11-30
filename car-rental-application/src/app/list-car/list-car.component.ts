import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CarsService } from '../services/cars.services';
@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  file;
 
  constructor( private formBuilder: FormBuilder, private carservice:CarsService) { }

  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
];
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      carName: ['', Validators.required],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      carPrice: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      carYear : ['', [Validators.required, Validators.pattern('[0-9]*')]],
      address2: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      alerts: ['', [Validators.required]],
      description:['',[Validators.required]],
      parkingDetails :['',[Validators.required]],
      features:['',[Validators.required]],
      dailyDistance: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      weeklyDistance:['', [Validators.required, Validators.pattern('[0-9]*')]],
      monthlyDistance:['', [Validators.required, Validators.pattern('[0-9]*')]]
  });
  }

  get f() { return this.registerForm.controls; }

  addCar(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.errors);
      console.log(this.registerForm.invalid);
      return;


  }
  
let car = {
    
  'carName':  this.registerForm.get('carName').value,
  'carYear':  this.registerForm.get('carYear').value,
  //'carImagePath':  this.registerForm.get('firstName').value,
 
  'carPrice': this.registerForm.get('carPrice').value,
  'description':  this.registerForm.get('description').value,
  'features':  this.registerForm.get('features').value,
  'parkingDetails':  this.registerForm.get('parkingDetails').value,
  'guidelines':  'Test guidelines',
  'dailyDistance':  this.registerForm.get('dailyDistance').value,
  'weeklyDistance':  this.registerForm.get('weeklyDistance').value,
  'monthlyDistance':  this.registerForm.get('monthlyDistance').value,
 // 'ownerName':  this.registerForm.get('firstName').value,
  'milage':  40 ,
  'fuelType':  'Gas',
  'doorCount': 4,
  'seatCount':  4
}
this.carservice.putCar(car);
}


  // onFileUpload(event){
  //    this.file = event.target.files[0];
  //    console.log(this.file);
     
  //   }

}