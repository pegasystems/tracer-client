import {Component, Input, OnInit, ViewChild, Injectable} from '@angular/core';
import {Page} from "../../../../tracer-client/src/page";
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';


import {Property} from "../../../../tracer-client/src/property";


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
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

/*@Injectable()
export class FileDatabase {
  dataChange: BehaviorSubject<PropertyNode[]> = new BehaviorSubject<PropertyNode[]>([]);

  get data(): PropertyNode[] { return this.dataChange.value; }

  constructor(page:Page,xmlString: string) {
    this.initialize(page, xmlString);
  }

  initialize(page: Page, xmlString:string) {
    // Notify the change.
    // @ts-ignore
    this.dataChange.next(data);
  }

}*/


@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.css'],
  // providers: [FileDataBase]
})


export class PageViewerComponent implements OnInit {
  @Input() page: Page;


  private _transformer = (node: PropertyNode, level: number) => {

    /* let flatNode = new ExampleFlatNode();

     flatNode.name = node.name;
     flatNode.value = node.value;
     flatNode.expandable = !!node.children;
     flatNode.subscript = node.index;
     flatNode.level = level;

     return flatNode;*/
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      value: node.value,
      subscript: node.index,
      level: level,
    };
  };


  /*  treeControl: FlatTreeControl<ExampleFlatNode>;

     treeFlattener: MatTreeFlattener<PropertyNode, ExampleFlatNode>;

     dataSource: MatTreeFlatDataSource<PropertyNode, ExampleFlatNode>;*/
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);


  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(/*database: FileDataBase*/) {
   /* this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<ExampleFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });*/
  }


  /*  private _getLevel = (node: ExampleFlatNode) => {
      return node.level;
    };

    private _isExpandable = (node: ExampleFlatNode) => {
      return node.expandable;
    };

    private _getChildren = (node: PropertyNode): Observable<PropertyNode[]> => {
      return observableOf(node.children);
    }*/


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
    this.tree.treeControl.expandAll();
  }
}
  


