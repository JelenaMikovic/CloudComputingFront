import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadFormComponent } from '../upload-form/upload-form.component';
import { ContextMenuModel } from '../interfaces/ContextMenuModel';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  title = 'context-menu';

  isDisplayContextMenu: boolean = true;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number = 0;
  rightClickMenuPositionY: number = 0;

    constructor(private matDialog: MatDialog, 
      ) {}

  ngOnInit() {}

  openUploadForm() {
    const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "450px"; 


      const modalDialog = this.matDialog.open(UploadFormComponent, dialogConfig);

      console.log(modalDialog);
  }

  displayContextMenu(event: { clientX: number; clientY: number; }) {

    this.isDisplayContextMenu = true;

    this.rightClickMenuItems = [
      {
        menuText: 'Share file',
        menuEvent: 'Handle share',
      },
      {
        menuText: 'Delete',
        menuEvent: 'Handle delete',
      },
    ];

    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;

  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event: { data: any; }) {
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
           console.log('To handle share');
           break;
      case this.rightClickMenuItems[1].menuEvent:
          console.log('To handle delete');
    }
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }
}
