import "./scss/styles.scss";

import { ProductsModel } from "./components/Models/ProductsModel";
import { BasketModel } from "./components/Models/BasketModel";
import { BuyerModel } from "./components/Models/BuyerModel";
import { AppApi } from "./components/services/AppApi";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { IOrder } from "./types";

const api = new Api(API_URL);
const appApi = new AppApi(api);

const productsModel = new ProductsModel();
const basketModel = new BasketModel();
const buyerModel = new BuyerModel();

async function init() {
    try {
        console.log("Загрузка товаров с сервера...");
        const data = await appApi.getProducts();
        productsModel.setItems(data.items);
        console.log("Каталог загружен. Товаров:", productsModel.getTotal()); 

        //Проверка ProductsModel
        console.group("Проверка ProductsModel");
        console.log("Массив товаров из каталога:", productsModel.getItems());
        console.log("Всего товаров:", productsModel.getTotal());

        const product1 = productsModel.getItemById("854cef69-976d-4c2a-a18c-2aa45046c390");
        const product2 = productsModel.getItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");

        console.log("Товар по id (product1):", product1);
        console.log("Товар по id (product2):", product2);

        //Проверка выбранного товара
        if (product1) {
            productsModel.setSelectedProduct(product1);
            console.log("Выбранный товар для просмотра:", productsModel.getSelectedProduct());
        }
        console.groupEnd();

        //Проверка BasketModel
        console.group("Проверка BasketModel");
        if (product1) basketModel.addItem(product1);
        if (product2) basketModel.addItem(product2);

        console.log("Товары в корзине:", basketModel.getItems());
        console.log("Общее количество:", basketModel.getItemsCount());
        console.log("Общая стоимость:", basketModel.getTotalPrice());

        if (product1) {
            console.log(`Есть ли товар ${product1.id} в корзине?`, basketModel.hasItem(product1.id));
            basketModel.removeItem(product1);
            console.log("После удаления товара:", basketModel.getItems());
        }

        basketModel.clear();
        console.log("После очистки корзины:", basketModel.getItems());
        console.groupEnd();

        //Проверка BuyerModel
        console.group("Проверка BuyerModel");
        
        //Тест валидации
        console.log("Ошибки валидации (пустые данные):", buyerModel.validate());

        //Заполняем данные
        buyerModel.setUserData({
            payment: "card",
            email: "Alpha.centauri@Alphacentauri.io",
            phone: "+77081112233",
            address: "Москва, какая-то улица, какой-то дом",
        });
        console.log("Данные покупателя (заполненные):", buyerModel.getUserData());

        //Тест валидации
        console.log("Ошибки валидации (заполненные данные):", buyerModel.validate());

        buyerModel.clear();
        console.log("Данные покупателя (после очистки):", buyerModel.getUserData());

        buyerModel.setUserData({
            payment: "card",
            email: "Alpha.centauri@Alphacentauri.io",
            phone: "+77081112233",
            address: "Москва, какая-то улица, какой-то дом",
        });

        if (product1) basketModel.addItem(product1);
        if (product2) basketModel.addItem(product2);

        const buyerData = buyerModel.getUserData();
        const order: IOrder = {
            payment: buyerData.payment || 'card',
            email: buyerData.email,
            phone: buyerData.phone,
            address: buyerData.address,
            items: basketModel.getItems().map(item => item.id),
            total: basketModel.getTotalPrice()
        };
        console.log("Заказ для отправки:", order);
        console.groupEnd();

        //Отправка заказа на сервер
        console.group("Отправка заказа на сервер");
        const orderResult = await appApi.postOrder(order);
        console.log("Заказ оформлен:", orderResult);
        console.groupEnd();

    } catch (err) {
        console.error("Ошибка:", err);
    }
}

init();