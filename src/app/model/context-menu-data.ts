import { Subject } from 'rxjs';

export class ContextMenuData {
    show = false;
    menuItems: MenuItem [];
    mouseEvent: any;

    constructor(
        ) { }
}

export class MenuItem {
    constructor(
        public label: string,
        public value: string,
        public subject: Subject<any>
    ) { }
}
