import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent, ProfileDialogComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dialog: MatDialog;
  let authService: AuthService
  let toastrService : ToastrService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        ProfileDialogComponent
      ],
      imports: [
        MatMenuModule,
        MatIconModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatToolbarModule,
        NoopAnimationsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        })
      ],
      providers: [
        ToastrService,
        AuthService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 143587972, firstName: 'foo', lastName: 'bar', email: 'biz', photo: 'baz'}
        }
      ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ ProfileDialogComponent ],
        }
      }
    )
    .compileComponents()
  })
  
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent)
    fixture.autoDetectChanges(true)
    component = fixture.componentInstance

    authService = TestBed.inject(AuthService)
    toastrService = TestBed.inject(ToastrService)

    spyOn(toastrService, 'success')
    spyOn(toastrService, 'error')

    dialog = TestBed.inject(MatDialog)

    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isLoggedIn should call AuthService', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    fixture.detectChanges()
    expect(authService.isLoggedIn).toHaveBeenCalled()
  });

  it('should not display the nav menu when isLoggedIn returns false', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false)
    fixture.detectChanges()
    const userMenu = fixture.nativeElement.parentNode.querySelector('#userMenu')
    expect(userMenu).toBeTruthy()
    const navMenu = fixture.nativeElement.parentNode.querySelector('#navMenu')
    expect(navMenu).toBeFalsy()
  })

  it('should display the login menu item but not profile and logout menu items when isLoggedIn returns false', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false)
    fixture.detectChanges()
    const menuButton = fixture.nativeElement.querySelector('#userMenu')
    menuButton.click()
    const googleBtn = fixture.nativeElement.parentNode.querySelector('#googleBtn')
    expect(googleBtn).toBeTruthy();
    const btnProfile = fixture.nativeElement.parentNode.querySelector('#btnProfile')
    expect(btnProfile).toBeFalsy();
    const btnLogout = fixture.nativeElement.parentNode.querySelector('#btnLogout')
    expect(btnLogout).toBeFalsy();
  })

  it('should show profile and logout menu items but not login menu item when isLoggedIn returns true', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    fixture.detectChanges()
    const menuButton = fixture.nativeElement.querySelector('#userMenu')
    menuButton.click()
    const googleBtn = fixture.nativeElement.parentNode.querySelector('#googleBtn')
    expect(googleBtn).toBeFalsy();
    const btnProfile = fixture.nativeElement.parentNode.querySelector('#btnProfile')
    expect(btnProfile).toBeTruthy();
    const btnLogout = fixture.nativeElement.parentNode.querySelector('#btnLogout')
    expect(btnLogout).toBeTruthy();
  })

  it('#openUserProfile should display the user info from auth service when the profile menu item is clicked', () => {
    // leave this comment, as an example of creating spies
    // const authServiceSpy =
    //   jasmine.createSpyObj('AuthService', ['getUserInfo']);
  
    spyOn(authService, 'isLoggedIn').and.returnValue(true)
    spyOn(authService, 'getUserInfo').and.returnValue({ id: 1234567890, firstName: 'foo', lastName: 'bar', email: 'biz', photo: 'baz'})
    fixture.detectChanges()

    const menuButton = fixture.nativeElement.querySelector('#userMenu')
    menuButton.click()
    // fixture.detectChanges()
    const btnProfile = fixture.nativeElement.parentNode.querySelector('#btnProfile')
    btnProfile.click()
    // fixture.detectChanges()
    expect(authService.getUserInfo).toHaveBeenCalled()
    expect(component.dialog.openDialogs[0]._containerInstance._config).toBeDefined()
    expect(component.dialog.openDialogs[0].componentInstance.userInfo.id).toBe(1234567890)
    expect(component.dialog.openDialogs[0].componentInstance.userInfo.firstName).toBe('foo')
    expect(component.dialog.openDialogs[0].componentInstance.userInfo.lastName).toBe('bar')
    expect(component.dialog.openDialogs[0].componentInstance.userInfo.email).toBe('biz')
    expect(component.dialog.openDialogs[0].componentInstance.userInfo.photo).toBe('baz')
  })
});
