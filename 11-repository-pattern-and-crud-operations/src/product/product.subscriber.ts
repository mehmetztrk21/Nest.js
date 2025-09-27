import { Product } from 'src/entities/product.entity';
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    listenTo() {
        return Product;
    }
    afterInsert(event: InsertEvent<Product>): Promise<any> | void {
        console.log(`A new product has been inserted: `, event.entity);
    }
    afterUpdate(event: UpdateEvent<Product>): Promise<any> | void {
        console.log(`A product has been updated: `, event.entity);
    }
    afterRemove(event: RemoveEvent<Product>): Promise<any> | void {
        console.log(`A product has been removed: `, event.entity);
    }
}
