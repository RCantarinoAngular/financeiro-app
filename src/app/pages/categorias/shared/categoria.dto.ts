import { ModelBase } from '../../../shared/models/modelBase.dto'

export class CategoriaDTO extends ModelBase {
    /**
     *
     */
    constructor(public id?: number,
        public name?: string,
        public description?: string) {
        super()


    }
}