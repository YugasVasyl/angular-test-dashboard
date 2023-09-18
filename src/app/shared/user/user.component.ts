import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/type';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule
  ]
})
export class UserComponent {
  @Input() public user: User | undefined;
  @Output() public edit = new EventEmitter();
  @Output() public remove = new EventEmitter();

  public onEdit(): void {
    this.edit.emit();
  }

  public onRemove(): void {
    this.remove.emit();
  }
}

