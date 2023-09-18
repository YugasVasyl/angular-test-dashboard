import { ChangeDetectionStrategy, Component, signal, inject, DestroyRef } from '@angular/core';
import { UserApiService } from './services/user-api.service';
import { User } from './types/type';
import { tap, takeUntil } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { UserPopupComponent } from './shared/user-popup/user-popup.component';
import { ConfirmPopupComponent } from './shared/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public users = signal<User[]>([]);
  private destroyRef = inject(DestroyRef);

  constructor(
    private userApiService: UserApiService,
    public dialog: MatDialog,
  ) {
    this.userApiService.getUsers().pipe(
      tap((users) => this.users.set(users)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public onEdit(user: User): void {
    const dialogRef = this.dialog.open(UserPopupComponent, {
      data: user,
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(result => {
      if (result) {
        this.users.mutate(users => {
          users.splice(users.findIndex(u => u.id === user.id), 1, result);
          return users;
        });
      }
    });
  }

  public newUser(): void {
    const dialogRef = this.dialog.open(UserPopupComponent);

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(result => {
      if (result) {
        this.users.mutate(users => users.push(result));
      }
    });
  }


  public onRemove(user: User): void {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      data: {
        question: `Are you sure you want to remove user ${user.name}?`,
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(result => {
      if (result) {
        this.users.mutate(users => users.splice(users.findIndex(u => u.id === user.id), 1));
      }
    });
  }
}
