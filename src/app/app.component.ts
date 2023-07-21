import { Component, ViewChild, ElementRef } from '@angular/core';
import { ExpenseService } from './services/expense.service';

interface user {
  name: string;
  expense: string;
}

interface userExpense {
  name: string;
  remaining: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rentbunk';

  loadingStatus: boolean;
  expenseSection: boolean;
  addExpenseBtn_txt: string;
  msg_text: string;

  usersExpenseList: Array<user>;
  expenses: Array<userExpense>;

  @ViewChild('username') name?: ElementRef;
  @ViewChild('userexpense') expense?: ElementRef;

  constructor(private expenseService: ExpenseService) {
    this.expenseSection = false;
    this.loadingStatus = false;
    this.addExpenseBtn_txt = 'Add expense';
    this.msg_text = '';
    this.usersExpenseList = [];
    this.expenses = [];
  }

  openExpenseForm(overrideStatus = false): void {
    if (overrideStatus) this.expenseSection = !this.expenseSection;
    else this.expenseSection = overrideStatus;

    this.addExpenseBtn_txt = ((this.expenseSection === true) ? 'Close' : 'Add expense');
  }

  addExpense(): void {
    if (/^-?\d+(\.\d+)?$/.test(this.name?.nativeElement.value) || this.name?.nativeElement.value === '') {
      this.msg_text = 'Please enter a valid name';
      this.clearMessage();
      return;
    }
    if (this.expense?.nativeElement.value === '') {
      this.msg_text = 'Please enter an expense';
      this.clearMessage();
      return;
    }

    this.msg_text = '';
    this.usersExpenseList.push({
      'name': this.name?.nativeElement.value,
      'expense': this.expense?.nativeElement.value
    });

    if (this.name?.nativeElement) this.name.nativeElement.value = '';
    if (this.expense?.nativeElement) this.expense.nativeElement.value = '';
    // this.openExpenseForm(); // To close form if needed
  }

  calculateExpense(): void {
    this.loadingStatus = true;
    this.expenseService.calculateExpense(this.usersExpenseList).subscribe(res => {
      this.loadingStatus = false;
      this.expenses = res;
    })
  }

  clearMessage() {
    setTimeout(() => {
      this.msg_text = '';
    }, 2200);
  }
}
