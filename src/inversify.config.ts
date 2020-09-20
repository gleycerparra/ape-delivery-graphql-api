import { Container } from "inversify";
import ICategoryRepository from "./modules/products/categories/repository/category.interface";
import CategoryRepository from "./modules/products/categories/repository/category.repository";
import { IPageInfoService, PageInfoService } from "./services/page-info.service";
import { IQueryParamsService, QueryParamsService } from "./services/query-params.service";

export const types = {
    IPageInfoService: Symbol.for("IPageInfoService"),
    IQueryParamsService: Symbol.for("IQueryParamsService"),
    ICategoryRepository: Symbol.for("ICategoryRepository"),
};
const container = new Container();

container.bind<IPageInfoService>(types.IPageInfoService).to(PageInfoService).inSingletonScope();
container.bind<IQueryParamsService<any>>(types.IQueryParamsService).to(QueryParamsService).inSingletonScope();
container.bind<CategoryRepository>(types.ICategoryRepository).to(CategoryRepository);


export { container };

