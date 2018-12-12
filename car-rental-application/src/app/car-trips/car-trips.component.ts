import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CarsService } from '../services/cars.services';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-car-trips',
  templateUrl: './car-trips.component.html',
  styleUrls: ['./car-trips.component.scss']
})
export class CarTripsComponent implements OnInit {

  listBookings= [];
  booking= {};
  carId;
  userId;
  now = new Date();

  constructor(private bookings:BookingsService,private carsService:CarsService,private userService:UsersService) { }

  ngOnInit() {

    this.userId = JSON.parse(localStorage.currentUser)[0]._id;
    this.carsService.getCarsforUser(this.userId).then(
      data => {
        this.carId = data[0]._id;
        this.bookings.getBookingByCar(this.carId).then(
          data2 => {
            for( let booking of data2 as string[]){
              console.log(booking['_id']);

                let end = new Date(booking['booking_endTime']);

                this.booking['id']= booking['_id'];
                this.booking['bookingDate'] =booking['created_date']
                this.booking['booking_startTime']=booking['booking_startTime'];
                this.booking['booking_endTime']=booking['booking_endTime'];
                this.booking['end']=end;
                this.booking['carName'] = data[0].carName;
                this.booking['carImagePath'] =data[0].carImagePath;
                this.listBookings.push(this.booking);

            }
            console.log(this.listBookings);
          });

      });


  }

  checkTime(endTime){
    let end = new Date(endTime);
    console.log(end.getTime());
    if(end.getTime() < this.now.getTime())
      return true;
    else
      return false;
  }


}
