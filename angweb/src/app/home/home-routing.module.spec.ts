import { HomeRoutingModule } from './home-routing.module';

describe('HomeModule', () => {
  let homeModule: HomeRoutingModule;

  beforeEach(() => {
    homeModule = new HomeRoutingModule();
  });

  it('should create an instance', () => {
    expect(homeModule).toBeTruthy();
  });
});
