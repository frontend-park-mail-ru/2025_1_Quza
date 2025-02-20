import {CodesContainer} from "../../components/codes/codes.js";
import {CodeEditor} from "../../components/code-editor/code-editor.js";
import {Home} from "../../components/home/home.js";

export default class MainPage {
  #parent;
  #config;
  #user;

  constructor(parent, config, user) {
    this.#parent = parent;
    this.#config = config;
    this.#user = user;
  }

  render() {
    this.#parent.innerHTML = '';

    const tmp = document.createElement('div');
    const template = Handlebars.templates["main-page.hbs"];
    tmp.innerHTML = template(this.#config.mainPage);
    this.#parent.appendChild(tmp.firstElementChild);

    const self = document.getElementById('main-page');


    if (this.#user.isAuthorized) {
      const codesContainer = new CodesContainer(self, this.#config)
      codesContainer.render()

      const codeEditor = new CodeEditor(self, this.#config)
      codeEditor.render()
    } else {
      const home = new Home(self, this.#config)
      home.render()
    }
  }
}
