import { IApi } from '../../types';
import { IApiProductsResponse, IOrder, IOrderResponse } from '../../types';

export class AppApi {
    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    //Получить список товаров с сервера
    getProducts(): Promise<IApiProductsResponse> {
        return this._api.get<IApiProductsResponse>('/product');
    }

    //Отправить заказ на сервер
    postOrder(order: IOrder): Promise<IOrderResponse> {
        return this._api.post<IOrderResponse>('/order', order);
    }
}