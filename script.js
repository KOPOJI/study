document.addEventListener('DOMContentLoaded', () => { //"вешаемся" на событие загрузки DOM (когда все html-теги уже загрузились браузером)

    //HTML-контейнер для корзины
    const basketItemsContainer = document.querySelector('.js-basket-items');

    //контейнер для хранения элементов корзины
    const basketCartItems = [];

    //массив (список) товаров
    let woodItems = [
        {
            id: 'board1',
            name: 'доски',
            description: 'Крутые доски',
            price: {
                euro: 150,
                dollar: 200,
                ruble: 15000,
            }
        },
        {
            id: 'metric1',
            name: 'метрика "..."',
            description: 'Метрика для детей',
            price: {
                euro: 100,
                dollar: 150,
                ruble: 10000,
            }
        },
        {
            id: 'box1',
            name: 'шкатулки',
            description: 'Экслюзивные шкатулки, вау!',
            price: {
                euro: 50,
                dollar: 70,
                ruble: 5000,
            }
        }
    ];

    //HTML-контейнер, куда выводится список товаров
    let itemListWrapper = document.querySelector('.js-items-list');

    /**
     * Поиск элемента по его ID
     * @param list - список всех элементов (Array)
     * @param itemId - ID элемента
     * @returns {null}
     */
    function getItemById(/**Array*/list, /**String*/itemId) {
        let result = null;

        list.forEach((el) => { //пробегаемся по элементам. el - элемент с текущей итерации
            //и сравниваем ID элемента с искомым
            if(itemId === el.id) { //если ID элементов совпадают, то записываем в результат найденный элемент
                result = el;
            }
        })

        return result; //возвращаем результат (либо null - изначальное значение, либо найденный элемент)
    }

    /**
     * Вывод текущих элементов из корзины
     * @param container
     */
    function outputBasketItems(container) {
        //если элементов в корзине еще нет, выводим заголовок пустой корзины, иначе - "Cart items"
        //попутно убираем весь существующий ранее HTML этого блока
        container.innerHTML = basketCartItems.length ? '<h4>Cart items:</h4>' : '<h4>Your cart is empty.</h4>';

        //пробегаемся по элементам корзины
        basketCartItems.forEach(function(item) { //item - элемент с текущей итерации
            //вставляем html в контейнер
            container.insertAdjacentHTML('beforeend', `
                Name: ` + item.product.name + `;
                Price: ` + item.product.price.dollar + `$;
                Quantity: ` + item.quantity + `<hr>
            `)
        })
    }

    //пробегаемся по товарам
    woodItems.forEach((item) => { //item - элемент с текущей итерации

        //добавляем в конец контейнера itemListWrapper сгенерированный html-код товара
        itemListWrapper.insertAdjacentHTML(
            'beforeend',
            '<div class="js-item">' +
            'Name: <span class="js-item-name">' + item.name + '</span><br>' +
            'Description: <span class="js-item-descr">' + item.description + '</span><br>' +
            'Price: <span class="js-item-price">' + item.price.dollar + '</span>$<br>' +
            '<div><a href="#" class="js-want-to-buy" data-item-id="' + item.id + '">I want it!</a></div>' +
            '</div>' +
            '<hr>'
        );

    })

    //пробегаемся по ссылкам на добавление в корзину
    document.querySelectorAll('.js-want-to-buy').forEach((buyLink) => { //buyLink - элемент с текущей итерации

        //добавляем обработчик события клика на ссылку добавления в корзину
        buyLink.addEventListener('click', (e) => {
            e.preventDefault();  //отменяем действие браузера по умолчанию

            //пытаемся найти элемент среди списка товаров сайта по его ID из data-атрибута
            const woodItem = getItemById(woodItems, buyLink.dataset.itemId);

            if(woodItem !== null) { //элемент с таким ID найден

                const cartItemId = 'cart_' + woodItem.id; //ID для записи в корзину

                //пытаемся найти элемент среди списка товаров корзины по его ID для записи
                let cartItem = getItemById(basketCartItems, cartItemId);

                if(cartItem) { //элемент найден, просто увеличиваем количество в корзине
                    ++cartItem.quantity;
                } else {
                    //добавляем новый элемент в корзину
                    basketCartItems.push({
                        id: cartItemId,
                        product: woodItem,
                        quantity: 1,
                    });
                    //т.к. cartItem был пустой, но сейчас добавлен - берем его из корзины
                    cartItem = getItemById(basketCartItems, cartItemId);
                }

                //выводим элементы из корзины в HTML-контейнер basketItemsContainer
                outputBasketItems(basketItemsContainer);

                //Добавляем текст о результате операции добавления в корзину
                basketItemsContainer.insertAdjacentHTML(
                    'afterbegin',
                    '<div class="js-basket-cart-add">' +
                    'You added: ' + woodItem.name +
                    ' (' + woodItem.price.dollar + '$)' +
                    ', quantity: ' + cartItem.quantity +
                    '</div>'
                )
            } else { //Ахтунг! элемент с таким ID не найден! Кулхацкер детектед!
                alert('Ты вредный кулхацкер!');
            }
        })

    })

    //добавляем слушатель(обработчик) события клика на контейнер корзины
    //по сути - только для теста
    basketItemsContainer.addEventListener('click', function(e) {
        e.preventDefault();
        console.log(basketCartItems); //выводим в консольку текущие элементы корзины
    })

    //выводим в HTML текущий блок корзины
    outputBasketItems(basketItemsContainer)

});