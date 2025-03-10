import '../../../build/header.js';
import { AppEventMaker } from '../../modules/eventMaker.js';
import { UserStoreEvents } from '../../stores/user/events.js';
import { AppUserStore } from '../../stores/user/userStore.js';
import { router } from '../../modules/router.js';
import { Button } from '../button/button.js';
import { Clickabletext } from '../clickable-text/clickable-text.js';
import { SettingsPanel } from '../settings-panel/settings-panel.js';
import { Logo } from '../logo/logo.js';
import { SearchBar } from '../search-bar/search-bar.js';

/**
 * Хедер
 */
export class Header {
  #parent;
  #config;
  #projName;

  #logo;

  #menu;

  #line;

  #searchBar;

  #authPageLink;

  #settingsPanel;
  #clickabletexts;

  #clickabletextFiles1;
  #clickabletextFiles2;

  /**
   * Конструктор класса
   * @param parent {HTMLElement} - родительский элемент
   * @param config {Object} - пропсы
   */
  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
    this.#clickabletexts = [];
  }

  /**
   * Возвращает HTML элемент компонента
   * @returns {HTMLElement}
   */
  get self() {
    return document.getElementById('header');
  }

  /**
   * Подписка на события
   * При успешном логине - удалить ссылку на страницу авторизации и вывести профиль пользователя
   * При логауте - удалить профиль пользователя и вывести ссылку на страницу авторизации
   */
  #addEventListeners() {
    AppEventMaker.subscribe(UserStoreEvents.SUCCESSFUL_LOGIN, () => {
      if (this.#settingsPanel === undefined) {
        this.#settingsPanel = new SettingsPanel(
          document.querySelector('.right-container'),
          this.#config.settings,
        );
      }
      this.#settingsPanel.render();

      this.#authPageLink.self.classList.add('hidden');
    });

    AppEventMaker.subscribe(UserStoreEvents.CHANGE_PAGE, (href) => {
      console.log('CHANGE_PAGE');
      console.log(href);
      if (href === '/') {
        if (!AppUserStore.IsAuthenticated()) {
          this.#authPageLink.self.classList.remove('hidden');
        }
      } else {
        this.#authPageLink.self.classList.add('hidden');
      }
      if (href === '/codes1') {
        if (this.#projName === undefined) {
          this.#projName = document.createTextNode(href.substring(1));
          document
            .querySelector('.projname-container')
            .appendChild(this.#projName);
        }
        if (this.#searchBar === undefined) {
          this.#searchBar = new SearchBar(
            document.querySelector('.search-bar'),
            { id: 'searchbarcodes1' },
          );
          this.#searchBar.render();
        }
        if (this.#line === undefined) {
          const head = document.querySelector('header');
          this.#line = document.createElement('div');
          this.#line.className = 'line';
          head.appendChild(this.#line);
        }
        if (this.#clickabletexts[0] === undefined) {
          this.#clickabletexts[0] = new Clickabletext(
            document.querySelector('.right-container1'),
            'addBlock',
            '+ Код',
            { data: 'bkjvgcfd', projName: href.substring(1) },
          );
          this.#clickabletexts[0].render();
        }
        if (this.#clickabletexts[1] === undefined) {
          this.#clickabletexts[1] = new Clickabletext(
            document.querySelector('.right-container2'),
            'addBlock',
            '+ Текст',
            { data: 'bkjvgcfd', projName: href.substring(1) },
          );
          this.#clickabletexts[1].render();
        }
        if (this.#clickabletexts[2] === undefined) {
          this.#clickabletexts[2] = new Clickabletext(
            document.querySelector('.right-container3'),
            this.validateData,
            'Скачать',
          );
          this.#clickabletexts[2].render();
        }
        if (this.#clickabletexts[3] === undefined) {
          this.#clickabletexts[3] = new Clickabletext(
            document.querySelector('.right-container4'),
            this.validateData,
            'Поделиться',
          );
          this.#clickabletexts[3].render();
        }
        if (this.#clickabletexts[4] === undefined) {
          this.#clickabletexts[4] = new Clickabletext(
            document.querySelector('.right-container5'),
            this.validateData,
            'Удалить',
          );
          this.#clickabletexts[4].render();
        }
      } else {
        if (this.#projName !== undefined) {
          this.#projName.parentNode.removeChild(this.#projName);
          this.#projName = undefined;
        }
        if (this.#line !== undefined) {
          document
            .querySelector('header')
            .removeChild(
              document.querySelector('header').querySelector('.line'),
            );
          this.#line = undefined;
        }
        if (this.#searchBar !== undefined) {
          document
            .querySelector('.search-bar')
            .removeChild(
              document.querySelector('.search-bar').querySelector('.search'),
            );
          this.#searchBar = undefined;
        }
        if (this.#clickabletexts[0] !== undefined) {
          document
            .querySelector('.right-container1')
            .removeChild(
              document
                .querySelector('.right-container1')
                .querySelector('.clickable-text'),
            );
          this.#clickabletexts[0] = undefined;
        }
        if (this.#clickabletexts[1] !== undefined) {
          document
            .querySelector('.right-container2')
            .removeChild(
              document
                .querySelector('.right-container2')
                .querySelector('.clickable-text'),
            );
          this.#clickabletexts[1] = undefined;
        }
        if (this.#clickabletexts[2] !== undefined) {
          document
            .querySelector('.right-container3')
            .removeChild(
              document
                .querySelector('.right-container3')
                .querySelector('.clickable-text'),
            );
          this.#clickabletexts[2] = undefined;
        }
        if (this.#clickabletexts[3] !== undefined) {
          document
            .querySelector('.right-container4')
            .removeChild(
              document
                .querySelector('.right-container4')
                .querySelector('.clickable-text'),
            );
          this.#clickabletexts[3] = undefined;
        }
        if (this.#clickabletexts[4] !== undefined) {
          document
            .querySelector('.right-container5')
            .removeChild(
              document
                .querySelector('.right-container5')
                .querySelector('.clickable-text'),
            );
          this.#clickabletexts[4] = undefined;
        }
      }
      if (href === '/codes') {
        if (this.#clickabletextFiles1 === undefined) {
          //this.#clickabletextFiles1 = new Clickabletext(document.querySelector(".right-container1"), this.validateData,"Создать");
          document.querySelector('.right-container1').setAttribute('style', `top: ${10}px; left: ${200}px;`);
          this.#clickabletextFiles1 = new Button(
            document.querySelector('.right-container1'),
            { text: 'Создать' },
            this.handleButtonClickCreate,
          );
          this.#clickabletextFiles1.render();
        }
        if (this.#clickabletextFiles2 === undefined) {
            document.querySelector('.right-container2').setAttribute('style', `top: ${10}px; left: ${330}px;`);
          this.#clickabletextFiles2 = new Button(
            document.querySelector('.right-container2'),
            { text: 'Загрузить' },
            this.handleButtonClickCreate,
          );
          this.#clickabletextFiles2.render();
          document.querySelector('.right-container2').querySelector('.submit-btn').setAttribute('style', `background-color: #90bce9;`);
        }
      } else {
        if (this.#clickabletextFiles1 !== undefined) {
            document.querySelector('.right-container1').setAttribute('style', `top: ${80}px; left: ${50}px;`);
          document
            .querySelector('.right-container1')
            .removeChild(
              document
                .querySelector('.right-container1')
                .querySelector('.submit-btn'),
            );
          this.#clickabletextFiles1 = undefined;
        }
        if (this.#clickabletextFiles2 !== undefined) {
            document.querySelector('.right-container2').setAttribute('style', `top: ${80}px; left: ${150}px;`);
          document
            .querySelector('.right-container2')
            .removeChild(
              document
                .querySelector('.right-container2')
                .querySelector('.submit-btn'),
            );
          this.#clickabletextFiles2 = undefined;
        }
      }
    });

    AppEventMaker.subscribe(UserStoreEvents.LOGOUT, () => {
      console.log('LOGOUT');

      this.#settingsPanel.remove();

      if (this.#authPageLink === undefined) {
        this.#authPageLink = new Button(
          this.#menu,
          this.#config.menu.auth,
          this.handleButtonClick,
        );
        this.#authPageLink.render();
      } else {
        this.#authPageLink.self.classList.remove('hidden');
      }
    });
  }

  /**
   * Перенаправление пользователя на страницу авторизации
   */
  handleButtonClick = () => {
    router.redirect('/login');
  };

  /**
   * Перенаправление на страницу проекта
   */
  handleButtonClickCreate = () => {
    router.redirect('/codes1');
  };

  /**
   * Рендеринг хедера
   */
  render() {
    this.#parent.insertAdjacentHTML(
      'afterbegin',
      window.Handlebars.templates['header.hbs'](this.#config),
    );

    //  this.#clickabletext = new Clickabletext(document.querySelector(".right-container1"), this.validateData);
    //             this.#clickabletext.render();
    this.#logo = new Logo(
      document.querySelector('.logo-container'),
      this.#config.logo,
    );
    this.#logo.render();

    const rightContainer = document.querySelector('.right-container');

    this.#menu = document.createElement('div');
    this.#menu.className = 'menu-container';

    rightContainer.appendChild(this.#menu);

    if (AppUserStore.IsAuthenticated()) {
      this.#settingsPanel = new SettingsPanel(
        document.querySelector('.right-container'),
        this.#config.settings,
      );
      this.#settingsPanel.render();
    } else {
      this.#authPageLink = new Button(
        this.#menu,
        this.#config.menu.auth,
        this.handleButtonClick,
      );
      this.#authPageLink.render();
    }

    this.#addEventListeners();
  }
}
