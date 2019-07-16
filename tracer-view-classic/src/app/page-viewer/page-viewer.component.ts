import {Component, Input, OnInit} from '@angular/core';
import {Page} from "../../../../tracer-client/src/page";
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {debug} from "util";

/*export interface Page {
  page: Page;
  children?: Page[];
}*/

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface PropertyNode {
  name: string;
  value: string;
  children?: PropertyNode[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  value: string;
  level: number;
}

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css']
})
export class PageViewerComponent implements OnInit {
  @Input() page: Page;

  private _transformer = (node: PropertyNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      value: node.value,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    let propertyList = [];
    for(let x in this.page.properties){
      propertyList.push({
        "name" : x,
        "value" : this.page.properties[x]
      })
    }
    debugger;
    this.dataSource.data = propertyList;
    debugger;
  }
}
