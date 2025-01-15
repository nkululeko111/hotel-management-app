import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;
  let ngZoneMock: jasmine.SpyObj<NgZone>;

  beforeEach(() => {
    // Mock dependencies
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUserRole']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    ngZoneMock = jasmine.createSpyObj('NgZone', ['run']);

    // Configure TestBed
    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NgZone, useValue: ngZoneMock },
      ],
    });

    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
