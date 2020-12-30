document.addEventListener('DOMContentLoaded', () => {

    let woodItems = [
        {
            name: 'доски',
            description: 'Крутые доски',
            price: {
                euro: 150,
                dollar: 200,
                ruble: 15000,
            }
        },
        {
            name: 'метрика "..."',
            description: 'Метрика для детей',
            price: {
                euro: 100,
                dollar: 150,
                ruble: 10000,
            }
        },
        {
            name: 'шкатулки',
            description: 'Экслюзивные шкатулки, вау!',
            price: {
                euro: 50,
                dollar: 70,
                ruble: 5000,
            }
        }
    ];

    let itemListWrapper = document.querySelector('.js-items-list');

    for(let i = 0; i < woodItems.length; ++i) {
        itemListWrapper.insertAdjacentHTML(
     'beforeend',
      '<div class="js-item">' +
                'Name: <span class="js-item-name">' + woodItems[i].name + '</span><br>' +
                'Descr: <span class="js-item-descr">' + woodItems[i].description + '</span><br>' +
                'Price: <span class="js-item-price">' + woodItems[i].price.dollar + '</span>$<br>' +
                '<div><a href="#" class="js-want-to-buy">I want it!</a></div>' +
            '</div>' +
            '<hr>'
        );
    }

    const buyLinks = document.querySelectorAll('.js-want-to-buy');

    for(let i = 0; i < buyLinks.length; ++i) {
        buyLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            const parentElement = this.closest('.js-item');
            document.querySelector('.js-basket-items').insertAdjacentHTML(
            'beforeend',
            '<div>' +
                    'You added: ' + parentElement.querySelector('.js-item-name').innerText +
                    ' ('+ parentElement.querySelector('.js-item-price').innerText + '$)' +
                '</div>'
            )
        })
    }

});