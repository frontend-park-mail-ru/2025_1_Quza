import { Navbar } from "../../../widgets/Navbar/index";
import MainTemplate from "../ui/MainView.hbs";
import "../ui/MainView.scss";
import { Page } from "../../..//types.d";
import { EventDispatcher, Listenable } from "../../../../modules/observer";
import { UIEvent } from "../../../../config";
export class MainPage extends Page implements Listenable<UIEvent> {
    private navbar: Navbar;

    private events_: EventDispatcher<UIEvent>;

    get events(): EventDispatcher<UIEvent> {
        return this.events_;
    }
    constructor() {
        super(MainTemplate(), "#main_page");
        this.events_ = new EventDispatcher<UIEvent>();

        this.navbar = new Navbar();

        this.navbar.events.subscribe(this.update.bind(this));
    }

    update(event?: UIEvent) {
        this.events_.notify(event);
    }
}
