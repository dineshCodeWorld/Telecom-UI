import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { get } from 'http';


@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  rcmsg: string;

  constructor(    private formBuilder: FormBuilder) { }
  successMsg: string;
  errorMsg: string;
  plans = [];
  accounts = [];
  registerForm: FormGroup;
  phoneNo:number;
  plan:string;
  account:string;
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      phoneNo: ["", [Validators.required, Validators.pattern("[7-9][0-9]{9}")]],
      currentPlan: this.formBuilder.group({
        planId: ["", [Validators.required]],
      }),
      accountName: this.formBuilder.group({
        actname: ["", [Validators.required]],
      }),

    });

    this.plans = [
      { label: "PLN_60", value: 60 },
      { label: "PLN_10", value: 10 },
      { label: "PLN_30", value: 30 },
      { label: "PLN_90", value: 90 },
      { label: "PLN_15", value: 15 },
      { label: "PLN_150", value: 150 },
      { label: "PLN_200", value: 200 },
      { label: "PLN_175", value: 175 },
      { label: "PLN_250", value: 250 },

    ];

    this.accounts = [
      { label: "JP", value: 1000 },
      { label: "CITY", value: 500 },


    ];
  }

  getValueByLabel(label: string): number | undefined {
    const account = this.accounts.find(account => account.label === label);
    return account ? account.value : undefined;
  }

  updateValueByLabel(label: string, newValue: number): boolean {
    const account = this.accounts.find(account => account.label === label);
    if (account) {
      account.value = newValue;
      return true;
    }
    return false;
  }
  
  recharge() {
        var value =  this.getValueByLabel(this.registerForm.value.accountName.actname) - this.registerForm.value.currentPlan.planId
        console.log(value);
        
        this.updateValueByLabel(this.registerForm.value.accountName,value)
       this.rcmsg = "Recharge success";
  }

}
