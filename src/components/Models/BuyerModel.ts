import { IBuyer, TBuyerErrors } from '../../types';

export class BuyerModel {

    private _data: IBuyer = {
        payment: null,
        email: '',
        phone: '',
        address: '',
    };

    //Сохранение данных
    setUserData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
    }

    //Получение всех данных
    getUserData(): IBuyer {
        return this._data;
    }

    //Очистка данных
    clear(): void {
        this._data = {
            payment: null,
            email: '',
            phone: '',
            address: '',
        };
    }

    //Валидация данных
    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {};

        if (!this._data.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this._data.email.trim()) {
            errors.email = 'Укажите email';
        }
        if (!this._data.phone.trim()) {
            errors.phone = 'Укажите телефон';
        }
        if (!this._data.address.trim()) {
            errors.address = 'Укажите адрес';
        }

        return errors;
    }
}