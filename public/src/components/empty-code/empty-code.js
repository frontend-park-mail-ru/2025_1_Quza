import '../../../build/empty-code.js';

/**
 * Пустое состояние проекта
 */
export class EmptyCode {
  #parent;
  #config;

  /**
   * Конструктор класса
   * @param parent {HTMLElement}
   * @param config {Object}
   */
  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  /**
   * Рендеринг компонента
   */
  render() {
    this.#parent.insertAdjacentHTML(
      'beforeend',
      window.Handlebars.templates['empty-code.hbs'](this.#config),
    );
  }
}
