import { Component, OnInit } from '@angular/core';
import { ContextMenuData, MenuItem } from '../model/context-menu-data';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  contextMenuView: ContextMenuData; // this needs to be defined in component level because it will be access from html
  
columnDefs = [
  {headerName: 'make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
  {headerName: 'model', field: 'model', sortable: true, filter: true },
  {headerName: 'price', field: 'price', sortable: true, filter: true }
];
rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
];

  constructor() {
    this.contextMenuView = new ContextMenuData();
   }

  ngOnInit() {
  }

  rightClick(event){
    // event.event.prevent();
    console.log("e   : ", event);
    console.log("d   : ",event.data);
    console.log("ee  : ",event.event.clientX);
    console.log("ee  : ",event.event.clientY);
  
    let subject = new Subject<any>();
    this.subscribeForAction(subject);

    // construct the contextMenuView with (action menu items and the mouse event)
    // this.contextMenuView.mouseEvent = event.event; // mouse event
    this.contextMenuView.menuItems = this.buildMenuItems(subject);
    this.contextMenuView.show=true; // will show the context menu (hiding will be handled by context menu itself)

  }

  private buildMenuItems(subject: Subject<any>){
    let items:MenuItem[] = [];

    items.push(new MenuItem("item 1", "item 1", subject));
    items.push(new MenuItem("item 2", "item 2", subject));
    items.push(new MenuItem("item 3", "item 3", subject));
    items.push(new MenuItem("item 4", "item 4", subject));

    return items;
}

  private subscribeForAction(subject: Subject<any>){
    let ovservable = subject.asObservable()

    ovservable.subscribe((item) => {
        console.log("Item Subscription got", item); // Subscription wont get
        // anything at this point
        if (item.value === 'item 1') { // in case if item is number 4 then i want to do something else
            // this.router.navigateByUrl('/google');
            console.log("item 1 : ", item);
        }
        else if(item.value === 'item 2'){
          console.log("item 2 : ", item);
        }
        else if(item.value === 'item 3'){
          console.log("item 3 : ", item);
        }
        else if(item.value === 'item 4'){
          console.log("item 4 : ", item);
        }
    });
}
onRightClick(event){
  console.log("onRightClick : ", event);
  this.contextMenuView.mouseEvent = event;
  return false;
}

}
