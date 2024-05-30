import { FavouriteService } from './../../Service/favourite.service';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AccountService } from '../../Service/Account-Service';
import { ProdUser } from '../../models/ProdUser';
import { UserFavProd } from '../../models/UserFavProd';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  
  prodId:number;
  alertMsg: string = "";
  UserID: string = "";
  AlreadyAdded: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlertComponent>,
    private accountService: AccountService,
    private FavouriteService: FavouriteService,
    public dialog: MatDialog,
  ) {
    this.prodId = data.productId;
    this.alertMsg = data.alertMsg;
    this.UserID = data.userId;
  }

   addTofavss(){
    this.AlreadyAdded = false;
    console.log("i check if already exist", this.AlreadyAdded);
    if(this.AlreadyAdded==false){
    console.log("i check if already exist", this.AlreadyAdded);

      
      // this.accountService.getTheLoggedInUserId().subscribe({
      //   next: (data) => {
      //     console.log(data);

      //     const prodUser: ProdUser = {
      //       productId: this.prodId,
      //       userId: data.userId
      //     };

      //     this.FavouriteService.AddProductToFavourite(prodUser).subscribe({
      //       next: (data) => {console.log("success"); console.log(data);}
      //     });
  
      //   },
      //   error: (error) => { console.log(error); }
      // });
    }
  }

  addTofav(){

    this.FavouriteService.getUserFav(this.UserID).subscribe({
      next: (data:UserFavProd[])=>{
        data.forEach(element => {
          if(element.productId==this.prodId){
            this.dialog.open(AlertComponent, {
              data: {
                 productId: this.prodId,
                 userId: this.UserID,
                 "alertMsg": "Already Added",
                 }
            });
            this.AlreadyAdded = true;
            console.log("AlreadyAdded: "+ "true");
          }
        });
        //--------------------------

        if(this.AlreadyAdded==false){
          this.accountService.getTheLoggedInUserId().subscribe({
        next: (data) => {
          console.log(data);

          const prodUser: ProdUser = {
            productId: this.prodId,
            userId: data.userId
          };

          this.FavouriteService.AddProductToFavourite(prodUser).subscribe({
            next: (data) => {console.log("success"); console.log(data);}
          });
  
        },
        error: (error) => { console.log(error); }
          });
      }      
      },
      error: (error)=>{console.log("erorrrr"); console.log(error)}
    })
  }
}
