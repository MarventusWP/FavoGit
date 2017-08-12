import { FavoGitPage } from './app.po';

describe('favo-git App', () => {
  let page: FavoGitPage;

  beforeEach(() => {
    page = new FavoGitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
