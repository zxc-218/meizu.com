import './library/jquery.js';
import { cookie } from './library/cookie.js';

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        let picture = JSON.parse(res.picture);
        let temp = `<span class="-name">${res.title}</span>`;
        $('.-name').replaceWith(temp);
        let temp1 = `<h1>${res.title}</h1>`;
        $('h1').replaceWith(temp1);
        let temp2 = `<div class="carousel-inner" role="listbox">
                        <div class="item active">
                             <a href=""><img src="../${picture[1].src}" alt=""></a>
                        </div>
                        <div class="item">
                            <a href=""><img src="../${picture[2].src}" alt=""></a>
                        </div>
                        <div class="item">
                             <a href=""><img src="../${picture[3].src}" alt=""></a>
                        </div>
                        <div class="item">
                             <a href=""><img src="../${picture[4].src}" alt=""></a>
                        </div>
                    </div>`;
        $('.carousel-inner').replaceWith(temp2);
        let temp3 = `<span class="vm-money">${res.price}</span>`;
        $('.vm-money').replaceWith(temp3);
        let temp4 = `<i>￥</i><strong class="J_totalPrice">${res.price}</strong>`;
        $('strong').replaceWith(temp4);
        let temp5 = `<div class="mod-control">
        <a href="javascript:;" class="vm-minus">-</a>
        <input type="number" value="1" min="1" max="${res.num}" id="num">
        <a href="javascript:;" class="vm-plus">+</a>
                        </div>`;
        $('.mod-control').replaceWith(temp5);
        let temp6 = `<a class="btn-addcart" href="../html/shop.html" id="addItem">加入购物车</a>`;
        $('.btn-addcart').replaceWith(temp6);

        $('#addItem').on('click', function() {
            addItem(res.id, res.price, $('#num').val());
        });
    }
});

function addItem(id, price, num) {
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        id,
        price,
        num
    };

    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shop.some(elm => elm.id == id)) {
            // 修改数量
            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shop.push(product);
        }

    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product); // 将第一个商品添加进数组
    }


    cookie.set('shop', JSON.stringify(shop), 1);

}

$(function() {
    let t = $('#num'); //数量
    let prices = $('.J_totalPrice').html(); //单件

    function total() {
        let total = 0;
        total = t.val() * prices;
        $(".J_totalPrice").html(total);
    }
    // 加
    $('.vm-plus').on('click', function() {
        if (t.val() < 100) {
            t.val(parseInt(t.val()) + 1);
        } else {
            t.val(1)
        }
        total();
    });
    //  减
    $('.vm-minus').on('click', function() {
        if (t.val() <= 1) {
            t.val(1)
        } else {
            t.val(parseInt(t.val()) - 1);
        }
        total();
    });
});