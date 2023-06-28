import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AwsServiceService } from '../service/aws-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FolderFormComponent } from '../folder-form/folder-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextMenuModel } from '../interfaces/ContextMenuModel';
import { F } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnChanges {

  albums: string[] = [];
  menu: any;
  @Input() folder: string = "all";


  isDisplayContextMenu: boolean = true;
  rightClickMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number = 0;
  rightClickMenuPositionY: number = 0;

  constructor(private matDialog: MatDialog, private service: AwsServiceService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'reloadTrigger' input property has changed
    if (changes['folder']) {
      // Perform any necessary actions here, such as resetting component state or fetching new data
      this.ngOnInit(); // Optionally, you can call ngOnInit() to rerun the initialization logic
    }
  }
  async ngOnInit() {
    console.log(this.folder);
    // if (this.folder != "Shared") {
    //   let response = await this.service.getAlbums(this.folder);
    //   response.subscribe({
    //     next: (res) => {
    //       this.albums = res;
    //       console.log(res);
    //     },
    //     error: (error) => {
    //     }
    //   })
    // }
  }

  public openUploadForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    dialogConfig.data = this.folder;
    const modalDialog = this.matDialog.open(FolderFormComponent, dialogConfig);

    modalDialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.albums.push(result);
        console.log(this.albums);
        this.cdr.detectChanges();
      }
    });
  }

  public openFolder(album: string) {
    this.router.navigate([this.router.url + "/" + album]);
  }

  displayContextMenu(event: { clientX: number; clientY: number; }, album: string) {

    this.isDisplayContextMenu = true;

    this.rightClickMenuItems = [
      {
        menuText: 'Delete',
        menuEvent: album,
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
        {
          this.deleteAlbum(this.router.url + "/" + this.rightClickMenuItems[0].menuEvent);
          break;
        }
    }
  }

  async deleteAlbum(folder: string) {
    console.log(folder);
    let response = await this.service.deleteAlbum(folder.substring(5));
    response.subscribe({
      next: (res) => {
        this.ngOnInit();
        this.router.navigate(['/', 'all']);
      },
      error: (error) => {
      }
    })
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }
}
