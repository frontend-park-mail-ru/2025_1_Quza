import Page from '../page.js';
import { LoginForm } from './login/login.js';
import { RegisterForm } from './register/register.js';
import '../../../build/auth.js';

/**
 * Страница аутентификации (вход/рега)
 */
export class AuthPage extends Page {
  #loginForm;
  #registerForm;

  /**
   * Отображение формы входа
   * Вызывается один раз, если url заканчивается на /login
   */
  renderLoginForm = () => {
    this.self.classList.remove('active');
    this.self
      .querySelector('.form-container.sign-up')
      .classList.remove('toggle-left');
    this.self
      .querySelector('.form-container.sign-up')
      .classList.add('toggle-right');
    document.title = 'Вход';
    console.log(this.self.querySelector('.auth-container'));

    this.#loginForm = new LoginForm(
      this.self.querySelector('.sign-in'),
      this.config.forms.login,
    );
    this.#loginForm.render();
  };

  /**
   * Отображение формы регистрации
   * Вызывается один раз, если url заканчивается на /register
   */
  renderRegisterForm = () => {
    this.self.classList.add('active');
    document.title = 'Регистрация';

    this.#registerForm = new RegisterForm(
      this.self.querySelector('.sign-up'),
      this.config.forms.register,
    );
    this.#registerForm.render();
  };

  /**
   * Прячет форму входа и отображает форму регистрации
   * Вызывается при нажатии на кнопку "Ещё нет аккаунта?"
   */
  toggleRegisterForm = () => {
    this.self.classList.add('active');
    this.self
      .querySelector('.form-container.sign-up')
      .classList.add('fade-left');
    this.self
      .querySelector('.form-container.sign-up')
      .classList.remove('fade-right');
    history.pushState(null, null, 'register');
    document.title = 'Регистрация';

    if (this.#registerForm === undefined) {
      this.#registerForm = new RegisterForm(
        this.self.querySelector('.sign-up'),
        this.config.forms.register,
      );
      this.#registerForm.render();
    }
  };

  /**
   * Очищает DOM
   */
  remove() {
    if (this.#loginForm !== undefined) {
      this.#loginForm.remove();
      this.#loginForm = undefined;
    }

    if (this.#registerForm !== undefined) {
      this.#registerForm.remove();
      this.#registerForm = undefined;
    }

    this.self.remove();
  }

  /**
   * Возвращает true, если открыта страница логина
   * @returns {boolean}
   */
  isLoginPage() {
    return window.location.href.includes('login');
  }

  /**
   * Рендерит страницу
   */
  render() {
    console.log('auth page render');
    this.parent.insertAdjacentHTML(
      'afterbegin',
      window.Handlebars.templates['auth.hbs'](this.config),
    );
    if (this.isLoginPage()) {
      this.#loginForm = new LoginForm(
        this.self.querySelector('.sign-in'),
        this.config.forms.login,
      );
    } else {
      this.#loginForm = new RegisterForm(
        this.self.querySelector('.sign-in'),
        this.config.forms.register,
      );
    }
    this.#loginForm.render();
  }
}
