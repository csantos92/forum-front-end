import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.page_title = 'Editar usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;

    //File uploader config
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: "1",
      uploadAPI: {
        url: this.url + 'upload-avatar',
        method: "POST",
        headers: {
          "Authorization": this.token
        }
      },
      theme: "dragNDrop",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: true,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Subir imagen',
        dragNDropBox: 'Arrastrar y soltar',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Imagen subida con éxito',
        afterUploadMsg_error: 'Error al subir la imagen',
        sizeLimit: 'Tamaño máximo'
      }
    };
  }

  avatarUpload(data) {
    //Update user object image
    this.user.image = data.body.user.image;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //Update user
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';

          //Update local storage data
          localStorage.setItem('identity', JSON.stringify(this.user));
        }

      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    )
  }


}
