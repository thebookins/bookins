import { BookinsPage } from './app.po';

describe('bookins App', () => {
  let page: BookinsPage;

  beforeEach(() => {
    page = new BookinsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
