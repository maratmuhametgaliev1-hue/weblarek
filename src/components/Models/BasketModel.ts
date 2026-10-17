import { IProduct } from '../../types';

export class BasketModel {
    private _items: IProduct[] = [];

    //Добавление товара
    addItem(product: IProduct): void {
        if (!this.hasItem(product.id)) {
            this._items.push(product);
        }
    }

    //Удаление товара
    removeItem(product: IProduct): void {
        this._items = this._items.filter(item => item.id !== product.id);
    }

    //Получение массива товаров
    getItems(): IProduct[] {
        return this._items;
    }

    //Очистка корзины
    clear(): void {
        this._items = [];
    }

    //Получение стоимости
    getTotalPrice(): number {
        return this._items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }

    //Получение количества товаров
    getItemsCount(): number {
        return this._items.length;
    }

    //Проверка наличия по id
    hasItem(id: string): boolean {
        return this._items.some(item => item.id === id);
    }
}