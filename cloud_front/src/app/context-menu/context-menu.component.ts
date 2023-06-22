import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContextMenuModel } from '../interfaces/ContextMenuModel';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  @Input()
  contextMenuItems: Array<ContextMenuModel> = [];

  @Output()
  onContextMenuItemClick: EventEmitter<any> = new EventEmitter<any>();

  onContextMenuClick(event: any, data: any): any {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }
}
