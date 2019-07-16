import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


import {TracerEventsService} from "../tracer-events.service";
import {TraceEvent} from '../trace-event'
import { Page} from "../../../../tracer-client/src/page";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";






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



export interface DialogData{
  page: Page;
  //children?: DialogData[];
  control: FlatTreeControl<ExampleFlatNode>;
  srcData: MatTreeFlatDataSource<FlatTreeControl<ExampleFlatNode>,MatTreeFlattener<any,any>>;
  hasChild: boolean;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})



export class EventListComponent implements OnInit {


  //Returns a food node
  private transformer = (node: FoodNode, level: number) => {
    return{
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    }
  }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);



  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  events: TraceEvent[];
  displayedColumns: string[] = [
    'line',
    'thread',
    'interaction',
    'rulesNumber',
    'stepMethod',
    'stepPage',
    'step',
    'eventType',
    'elapsed',
    'ruleName',
    'ruleset'];


  constructor(eventsService: TracerEventsService, public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;


    this.events = [];
    eventsService.onTraceEvents().subscribe((result) => {
      result.forEach((traceEvent) => {
        this.events.push(traceEvent);
      });
    });
  }

  ngOnInit() {}

  //Pass in a traceEvent as a parameter for all these three events
  openStepPage(event: TraceEvent):void {
    this.dialog.open(DialogOverviewExampleDialog, {
      width: "500px",
      height: "500px",
      data: {page: event.primaryPage, control: this.treeControl, source: this.dataSource,hasChild: this.hasChild}  //How to get current node into hasChild?
    });
    alert("Step Page Properties is being Opened");
  }



  openStepDetail():void {
    alert("openStepDetail")
  }

  openRule():void  {
    alert("openRule")
  }


  //Returns boolean, whether the current node is expandable or not
  hasChild = (node: ExampleFlatNode):boolean => node.expandable;

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})


export class DialogOverviewExampleDialog {


  constructor(




    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}















