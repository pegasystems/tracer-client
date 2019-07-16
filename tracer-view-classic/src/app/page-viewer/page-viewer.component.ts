import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";

import {EventListComponent} from "../event-list/event-list.component";


/*export interface Page {
  page: Page;
  children?: Page[];
}*/


interface FoodNode {
  name:string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];


interface ExampleFlatNode{
  expandable: boolean;
  name:string;
  level:number;
}



@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css']
})
export class PageViewerComponent implements OnInit {


  eventList: EventListComponent;

  ngOnInit() {}
}
