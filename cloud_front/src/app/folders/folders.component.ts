import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AwsServiceService } from '../service/aws-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FolderFormComponent } from '../folder-form/folder-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnChanges{
  
  albums: string[] = [];
  menu:any;
  @Input() folder: string = "all";
  
  constructor(private matDialog: MatDialog, private service: AwsServiceService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute) {}
  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'reloadTrigger' input property has changed
    if (changes['folder']) {
      // Perform any necessary actions here, such as resetting component state or fetching new data
      this.ngOnInit(); // Optionally, you can call ngOnInit() to rerun the initialization logic
    }
  }
  async ngOnInit() { 
    
    let response = await this.service.getAlbums(this.folder);
    response.subscribe({
      next: (res) => {
        this.albums=res;
        console.log(res);
      },
      error: (error) => {
      }
    })
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
}
