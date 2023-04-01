import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>Do you really want to delete this employee?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onDismiss()">No</button>
      <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  onDismiss(): void {
    this.dialogRef.close();
  }
}