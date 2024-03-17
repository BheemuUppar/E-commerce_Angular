import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  ratedStars !: number;
  comment !:string;
  productId :any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReviewComponent>
  ) {
this.productId = data.productId;
console.log(this.productId)
  }
  rateStar(starCount: number): void {
    this.ratedStars = starCount;
  }
  onOkClick(){
    let obj = {
      rating:this.ratedStars,
      comment:this.comment,
      productId : this.productId
    }
    this.dialogRef.close(obj);
  }

  onNoClick(){
    this.dialogRef.close(false);
  }
  isDisable(){
    if(!(this.ratedStars && this.comment)){
      return true;

    }else{
      return false;
    }
  }
}
