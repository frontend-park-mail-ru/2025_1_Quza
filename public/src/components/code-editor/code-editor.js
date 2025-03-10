import '../../../build/code-editor.js';
import { AppEventMaker } from '../../modules/eventMaker.js';
import { CodeEvents } from '../../pages/codes/events.js';
import { AppCodesStore } from '../../stores/codes/codesStore.js';

/**
 * Редактирование проекта
 */
export class CodeEditor {
  #parent;
  #config;

  #title;
  #content;

  /**
   * Конструктор класса
   * @param parent {HTMLElement} - родительский элемент
   * @param config {Object} - пропсы
   */
  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  /**
   * Возвращает HTML элемент компонента
   * @returns {HTMLElement}
   */
  get self() {
    return document.getElementById(this.#config.id);
  }

  /**
   * Обработчик выбора кода
   * @param code {Object}
   */
  #onCodeSelect = (code) => {
    this.#title.innerHTML = '';
    this.#content.innerHTML = '';

    const title = document.createElement('h2');
    title.innerText = code.title;
    this.#title.appendChild(title);

    const content = document.createElement('span');
    content.innerText = code.content;
    this.#content.appendChild(content);

    this.self.classList.add('active');
    this.#parent.classList.add('active');
  };

  /**
   * Обработчик закрытия окна просмотра кода программы
   */
  #closeEditor = () => {
    this.self.classList.remove('active');
    this.#parent.classList.remove('active');

    this.#title.innerText = '';
    this.#content.innerText = '';

    AppCodesStore.unselectCode();
  };

  /**
   * Подписка на события
   */
  #subscribeToEvents() {
    AppEventMaker.subscribe(CodeEvents.CODE_SELECTED, this.#onCodeSelect);
  }

  /**
   * Отписка от событий
   */
  #unsubscribeToEvents() {
    AppEventMaker.unsubscribe(CodeEvents.CODE_SELECTED, this.#onCodeSelect);
  }

  /**
   * Очистка
   */
  remove() {
    this.#unsubscribeToEvents();
  }

  /**
   * Рендеринг компонента
   */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['code-editor.hbs'](this.#config),
    );

    const closeBtn = this.self.querySelector('.close-editor-btn');
    closeBtn.addEventListener('click', this.#closeEditor);

    this.#title = this.self.querySelector('.code-title');
    this.#content = this.self.querySelector('.code-content');

    this.#subscribeToEvents();
  }
}
