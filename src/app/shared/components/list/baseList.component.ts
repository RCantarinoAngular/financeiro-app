import { OnInit, Injector } from '@angular/core';

//bases
import { ModelBase } from '../../models/modelBase.dto'
import { ServiceBase } from '../../services/serviceBase'

import { NgxSpinnerService } from 'ngx-spinner';


export abstract class BaseListComponent<T extends ModelBase> implements OnInit {
    resources: T[] = []
    loader: NgxSpinnerService

    constructor(protected baseService: ServiceBase<T>, protected injector: Injector) {
        this.loader = injector.get(NgxSpinnerService)

    }

    ngOnInit() {

        this.loader.show()
        this.getAll();
        this.loader.hide()

    }

    private getAll() {
        this.baseService.getAll()
            .subscribe(itens => this.resources = itens.sort((a, b) => b.id - a.id));
    }

    delete(resource: T) {

        let conf = confirm('Deseja excluir ?')
        if (conf) {
            this.baseService.delete(resource.id)
                .subscribe(result => this.getAll(),
                    error => alert('erro'))

        }
    }
}