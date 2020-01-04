import { Component, OnInit, Input } from '@angular/core';

interface BreadItem {
  text: string
  link?: string
}


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() Itens: Array<BreadItem> = []

  constructor() { }

  ngOnInit() {
  }

  isTheLast(item: BreadItem): boolean {
    return this.Itens.indexOf(item) + 1 == this.Itens.length;
  }





}
