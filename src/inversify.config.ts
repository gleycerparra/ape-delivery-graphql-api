import { Container } from "inversify";
import { ProductRepository } from "./modules/products/repository/product.repository";

export class DIContainer {

    public DIContainer: Container;
    private types = {
        ProductRepository: Symbol.for("ProductRepository"),
    };

    constructor() {
        this.setup();
    }

    setup(): void {
        this.DIContainer = new Container();

        this.DIContainer.bind<ProductRepository>(this.types.ProductRepository).to(ProductRepository)
    }
}