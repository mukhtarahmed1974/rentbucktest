import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {

    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:4000';
    }

    calculateExpense(userExpenseData: any): Observable<any> {
        return this.http
            .post(`${this.baseUrl}/calculate-expense`, userExpenseData);
    }
}
