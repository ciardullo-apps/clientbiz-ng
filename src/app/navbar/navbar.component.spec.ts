import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent, ProfileDialogComponent } from './navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dialog: MatDialog;
  let toastrServiceSpy : any;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);

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
        NoopAnimationsModule,
        ToastrModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { id: 143587972, firstName: 'foo', lastName: 'bar', email: 'biz', photo: 'baz'}
        },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ ProfileDialogComponent ],
        }
      }
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('#isLoggedIn should return stubbed value from a spy', () => {
    const authServiceSpy =
      jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    // set the value to return when the `getValue` spy is called.
    authServiceSpy.isLoggedIn.and.returnValue(true);

    component = new NavbarComponent(authServiceSpy, dialog, toastrServiceSpy);

    expect(component.isLoggedIn())
      .toBe(true, 'service returned true');
    expect(authServiceSpy.isLoggedIn.calls.count())
      .toBe(1, 'spy method was called once');
    expect(authServiceSpy.isLoggedIn.calls.mostRecent().returnValue)
      .toBe(true);
  });

  // it('#openUserProfile should display the user data from auth service', () => {
  //   const authServiceSpy =
  //     jasmine.createSpyObj('AuthService', ['getUserInfo']);
  //
  //   // set the value to return when the `getValue` spy is called.
  //   authServiceSpy.getUserInfo.and.returnValue({ id: 1234567890, firstName: 'foo', lastName: 'bar', email: 'biz', photo: 'baz'});
  //
  //   component = new NavbarComponent(authServiceSpy, dialog);
  //
  //   component.openUserProfile();
  //   console.log(component.dialog.openDialogs[0].componentInstance.userInfo);
  //   expect(component.dialog.openDialogs[0]._containerInstance._config)
  //     .toBeDefined();
  //   // expect(component.dialog.config.data)
  //   //   .toBeDefined();
  // })
});
