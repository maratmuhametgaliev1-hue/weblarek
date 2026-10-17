import { IBuyer, IOrder } from '../../types';

export class BuyerModel {
    private _data: Partial<IBuyer> = {};

    //Сохранение данных
    setUserData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
    }

    //Получение всех данных
    getUserData(): Partial<IBuyer> {
        return this._data;
    }

    //Очистка данных
    clear(): void {
        this._data = {};
    }

    //Валидация данных
    validate(): Record<string, string> {
        const errors: Record<string, string> = {};

        if (!this._data.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this._data.email) {
            errors.email = 'Укажите email';
        }
        if (!this._data.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this._data.address) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    }

    //Подготовка заказа для отправки
    prepareOrder(items: string[], total: number): IOrder {
        return {
            payment: this._data.payment || 'card',
            email: this._data.email || '',
            phone: this._data.phone || '',
            address: this._data.address || '',
            items,
            total,
        };
    }
}