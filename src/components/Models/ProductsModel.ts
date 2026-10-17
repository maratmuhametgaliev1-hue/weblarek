import { IProduct } from '../../types';

export class ProductsModel {
    private _items: IProduct[] = [];
    private _selectedProduct: IProduct | null = null;

    //Сохранение массива товаров
    setItems(items: IProduct[]): void {
        this._items = items;
    }

    //Получение массива товаров
    getItems(): IProduct[] {
        return this._items;
    }

    //Получение товара по id
    getItemById(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id);
    }

    //Получение общего количества товаров
    getTotal(): number {
        return this._items.length;
    }

    //Сохранение товара для подробного отображения
    setSelectedProduct(product: IProduct): void {
        this._selectedProduct = product;
    }

    //Получение товара для подробного отображения
    getSelectedProduct(): IProduct | null {
        return this._selectedProduct;
    }
}