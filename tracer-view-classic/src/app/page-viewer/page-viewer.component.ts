import {Component, Input, OnInit, ViewChild, Injectable} from '@angular/core';
import {Page} from "../../../../tracer-client/src/page";
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';

import {Property} from "../../../../tracer-client/src/property";


export class PropertyNode {
  name: string;
  value: string;
  index: string;
  children?: PropertyNode[];
}

/** Flat node with expandable and level information */
export class ExampleFlatNode {
  expandable: boolean;
  name: string;
  value: string;
  level: number;
  subscript: string;
}

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css'],
  // providers: [FileDataBase]
})


export class PageViewerComponent implements OnInit {
  @Input() page: Page;


  private _transformer = (node: PropertyNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      value: node.value,
      subscript: node.index,
      level: level,
    };
  };


  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);


  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {}


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    let propertyList = [];
    this.page.children.forEach((prop: Property) => {
      propertyList.push(prop);
    });
    this.dataSource.data = propertyList;

  }

  /*Tried to use to expand all tree nodes upon a step page window appearing */
  @ViewChild('tree', {static: false}) tree;
  ngAfterViewInit() {
    this.treeControl.expandAll();
  }
}
  


