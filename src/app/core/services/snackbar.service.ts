import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackbar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000
    });
  }
}
