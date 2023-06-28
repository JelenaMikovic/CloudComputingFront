import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadFormComponent } from '../upload-form/upload-form.component';
import { ContextMenuModel } from '../interfaces/ContextMenuModel';
import { ShareFormComponent } from '../share-form/share-form.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AwsServiceService } from '../service/aws-service.service';
import { File, Metadata } from '../model/files';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  title: string = '';
  fileTitle: string = '';
  allFiles = true;
  files: File[] = [];
  menu: any;
  routerSubscription: any;

  isDisplayContextMenu: boolean = true;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number = 0;
  rightClickMenuPositionY: number = 0;
  selectedFile: File = {
    content: '',
    metadata: {
      size: 0,
      file: '',
      caption: '',
      lastModified: 0,
      sharedWith: [],
      tags: [],
      type: ''
    }
  };

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private service: AwsServiceService
  ) {
    const newTitle = this.router.url.split('/').pop();
    if (newTitle != undefined) {
      this.title = newTitle;
    }
  }

  async ngOnInit() {
    const newTitle = this.router.url.split('/').pop();
    if (newTitle != undefined) {
      this.title = newTitle;
      if (newTitle != 'all') {
        this.fileTitle = newTitle;
      } else {
        this.fileTitle = 'All files';
      }
    }
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });

    let response;

    if (this.title === 'Shared') {
      response = await this.service.getFiles(this.title);
    } else {
      response = await this.service.getFiles(this.router.url.substring(1));
    }

    response.subscribe({
      next: (res) => {
        this.files = res.files;
        for (let file of this.files) {
          if (file.metadata.type === 'image/jpeg') {
            const dataURI = `data:image/jpeg;base64,${file.content.substring(
              2,
              file.content.length - 1
            )}`;
            file.icon = dataURI;
          } else if (file.metadata.type === 'image/png') {
            const dataURI = `data:image/png;base64,${file.content.substring(
              2,
              file.content.length - 1
            )}`;
            file.icon = dataURI;
          } else if (file.metadata.type === 'text/plain') {
            file.icon = 'assets/txt-icon.png';
          } else if (file.metadata.type === 'application/pdf') {
            file.icon = 'assets/pdf-icon.png';
          }
        }
      },
      error: (error) => {},
    });
  }

  ngOnDeystroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  openUploadForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    const modalDialog = this.matDialog.open(UploadFormComponent, dialogConfig);
  }

  displayContextMenu(event: { clientX: number; clientY: number }, file: File) {
    this.isDisplayContextMenu = true;
    this.selectedFile = file;

    this.rightClickMenuItems = [
      {
        menuText: 'Share file',
        menuEvent: file.metadata.file,
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
      top: `${this.rightClickMenuPositionY}px`,
    };

  }

  handleMenuItemClick(event: { data: any }) {
    switch (event.data) {
      case this.rightClickMenuItems[0].menuEvent:
        this.openShareForm(this.rightClickMenuItems[0].menuEvent);
        break;
      case this.rightClickMenuItems[1].menuEvent:
        console.log('To handle delete');
    }
  }

  async deleteAlbum() {
    let response = await this.service.deleteAlbum(this.title);
    response.subscribe({
      next: (res) => {
        this.ngOnInit();
        this.router.navigate(['/', 'all']);
      },
      error: (error) => {},
    });
  }

  openFileDetails(file: any) {
    this.router.navigate(['/file'], { state: { file } });

  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }

  openShareForm(file: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '450px';
    dialogConfig.data = {type: "file", name: file, share: true};
    const modalDialog = this.matDialog.open(ShareFormComponent, dialogConfig);

    console.log(modalDialog);
  }
}
