import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {TuiAlertService, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TUI_PASSWORD_TEXTS, TuiInputModule, TuiInputPasswordModule} from '@taiga-ui/kit';
import {of} from 'rxjs';
import * as events from "events";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiInputPasswordModule,
    TuiInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    {
      provide: TUI_PASSWORD_TEXTS,
      useValue: of(['']),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService, private authService: AuthenticationService) {
  }

  loginForm: FormGroup<any> = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required)
  });

  notReadyToSubmit = false;

  get isButtonDisabled(): boolean {
    return this.notReadyToSubmit || this.loginForm.invalid;
  }

  async login() {
    try {
      if (this.loginForm.invalid) {
        this.alerts.open('', {
          label: 'Please enter all fields',
          status: 'warning',
          autoClose: true,
        }).subscribe();
      } else {
        this.notReadyToSubmit = true;
        const result = await this.authService.authenticate(this.loginForm.value);

        if (result) {
          this.alerts.open('', {
            label: 'Successfully logged in',
            status: 'success',
            autoClose: true,
          }).subscribe();
          console.log(this.authService.getRoles());
          console.log(this.authService.getPermissions());
        }
      }
    } catch (error) {
      console.log(error);
      this.alerts.open('', {
        label: 'Invalid credentials',
        status: 'error',
        autoClose: true,
      }).subscribe();
    } finally {
      this.notReadyToSubmit = false;
    }
  }


  protected readonly events = events;
}
