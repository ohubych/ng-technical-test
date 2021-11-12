import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HttpClientModule } from '@angular/common/http';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { icons } from '@app/app.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NzLayoutModule,
                HttpClientModule],
            declarations: [AppComponent],
            providers: [
                { provide: NZ_ICONS, useValue: icons }
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'tg-angular-project-template'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('tg-angular-project-template');
    });

    xit('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.content span').textContent).toContain(
            'tg-angular-project-template app is running!'
        );
    });
});
