import { beforeEachProviders, describe, expect, it, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

class EmptyAppComponentMockClass { }

describe('App Component', () => {
    let app: AppComponent;

    beforeEachProviders(() => [
        AppComponent
    ]);

    beforeEach(inject([AppComponent], (_app) => {
        app = _app;
    }));

    it('should create the app', done => {
        expect(app).toBeDefined();
        done();
    });
});
