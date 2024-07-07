import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private service:RestService,private profileService: ProfileService,private fb:FormBuilder) { }

  updateForm: FormGroup;
  response:string;
  profileDetail: Profile;
  friendAndFamilyErrorMsg: string;
  errorMsg: string;
  phoneNo:number;


  ngOnInit(): void
  {
    this.getProfileDetails();
    this.updateForm = this.fb.group({
                    name:['',Validators.required],
                    age:['',[Validators.required]],
                    address:['',[Validators.required]],
                    password:['',[Validators.required]],
  })
  }

  getProfileDetails(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.profileDetail = data;
        this.phoneNo=data.phoneNo;
        
        if (this.profileDetail.friendAndFamily[0] === -1) {
          this.friendAndFamilyErrorMsg =
            "Could not populate Friends list. Please try again after some time";
        }
      },
      (error) => (this.errorMsg = error)
    );
    
  }


  public updateProfile(){
  console.log("form values ",this.updateForm.value);
    this.service.update(this.updateForm.value,this.phoneNo).subscribe(response=>this.response=response);
  }

}
