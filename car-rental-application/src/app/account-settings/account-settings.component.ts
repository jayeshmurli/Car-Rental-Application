import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FileService} from '../services/files.service'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  registerForm: FormGroup;
    submitted = false;

    constructor(private Users: UsersService, private Files: FileService, private formBuilder: FormBuilder, private active : ActivatedRoute) { }

  userObj = {};

  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
];

   user = localStorage.currentUser;
   filePath: any;


   userId = JSON.parse(this.user)[0]._id;

   file: File;

  ngOnInit() {
    console.log(JSON.parse(this.user)[0]._id);
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address1: ['', [Validators.required]],
      address2: [],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      profPic: [],
      alerts: ['', [Validators.requiredTrue]]
    });

    let id = this.active.snapshot.params['id'];
    console.log("ID::::;"+id);

    this.active.params.subscribe(
    (params) => {
      id = params['id'];
    })
    this.Users.getUserById(this.userId).then(

    data =>{
    console.log(data);
    this.userObj =data;
    this.populateUserDetails(this.userObj);
  });
}

  get f() { return this.registerForm.controls; }

  getUsers() {
    console.log('tect');
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }

    this.Users.getUsers();
  }


  populateUserDetails(user){
    console.log(user);


  }

  checkFile(fileEvent : any){
    console.log(typeof this.registerForm.get('profPic'));
    this.file = fileEvent.target.files[0];
    console.log('size', this.file.size);
    console.log('type', this.file.type);
    if(!this.file.type.includes('image')){
      alert("Please select a valid image file");
      fileEvent.target.value = '';
    }
  }

  async addUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.errors);
      console.log(this.registerForm.invalid);
      return;
  }
    console.log(this.registerForm.get('firstName').value);

    this.Files.uploadFile(this.file, this.userId).then(

      data =>{
      this.filePath = data;
      console.log(this.filePath);
      //alert(data as string[]);
      let user = {
        'userId' : this.userId,
        'FirstName': this.registerForm.get('firstName').value,
        'LastName': this.registerForm.get('lastName').value,
        'Email': this.registerForm.get('email').value,
        'Password': this.registerForm.get('password').value,
        'Address1': this.registerForm.get('address1').value,
        'Address2': this.registerForm.get('address2').value,
        'City': this.registerForm.get('city').value,
        'State': this.registerForm.get('state').value,
        'Zip': this.registerForm.get('zip').value,
        'ProfilePicPath' : this.filePath,
        'Alerts': this.registerForm.get('alerts').value
      };


      this.Users.updateUser(user);

    });


  }
}

