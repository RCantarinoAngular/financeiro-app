import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-msg',
  templateUrl: './server-error-msg.component.html',
  styleUrls: ['./server-error-msg.component.css']
})
export class ServerErrorMsgComponent implements OnInit {

  @Input('server-error-messages') serverErrorMessages: string[] = null;
  constructor() { }

  ngOnInit() {
  }

}
