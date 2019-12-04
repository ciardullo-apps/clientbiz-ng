import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        MatMenuModule,
        MatIconModule,
        RouterModule,
        HttpClientTestingModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
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

    component = new NavbarComponent(authServiceSpy);

    expect(component.isLoggedIn())
      .toBe(true, 'service returned true');
    expect(authServiceSpy.isLoggedIn.calls.count())
      .toBe(1, 'spy method was called once');
    expect(authServiceSpy.isLoggedIn.calls.mostRecent().returnValue)
      .toBe(true);
  });
});
