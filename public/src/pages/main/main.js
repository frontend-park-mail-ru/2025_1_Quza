import "../../../build/main.js"
import {CodesContainer} from "../../components/codes/codes.js";
import {AppUserStore} from "../../stores/user/userStore.js";
import {Home} from "../../components/home/home.js";

export default class Main {
  #parent;
  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  get href () {
    return this.#config.href;
  }

  get self () {
    return document.getElementById('main');
  }

  remove(){
    console.log("Main remove")
    this.self.remove()
  }

  render() {
    console.log("Main page render")

    this.#parent.insertAdjacentHTML(
        'afterbegin',
        window.Handlebars.templates['main.hbs'](this.#config)
    );

    if (AppUserStore.IsAuthenticated()) {
      const codesContainer = new CodesContainer(this.self, this.#config)
      codesContainer.render()
    } else {
      const home = new Home(this.self, this.#config.home)
      home.render()
    }
  }
}
