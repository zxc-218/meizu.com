import './library/jquery.js';
import { cookie } from './library/cookie.js';

let shop = cookie.get('shop');
if (shop) {
    shop = JSON.parse(shop); // 有cookie数据才需要转换
    //console.log(shop);

    let idList = shop.map(elm => elm.id).join(); // 获得所有id

    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {
            idList
        },
        dataType: "json",
        success: function(res) {
            let temp = '';
            res.forEach((elm, i) => {
                let picture = JSON.parse(elm.picture);

                // 让ajax获得的数据结果id与cookie中的id  一一对应
                // 索引不同

                // 从购物车的cookie数据中去选择当前遍历的数据
                let arr = shop.filter(val => val.id == elm.id);

                temp += `<li class="cart-merchant">
                <table class="cart-merchant-body">
                    <tr class="cart-product ">
                        <td class="cart-col-select">
                            <input class="checkbox" type="checkbox">
                            <a class="cart-product-link" href="">
                                <img src="../${picture[0].src}" alt="">
                            </a>
                            <a class="cart-product-info" href="">
                                <p>${elm.title}</p>
                                <p>无线版 银色</p>
                            </a>
                        </td>
                        <td class="cart-col-price">
                            <i>￥</i><span class="cart-price cart-price${elm.id}">${parseFloat(elm.price).toFixed(2)}</span>
                        </td>
                        <td class="cart-col-number">
                            <a href="javascript:;" class="vm-minus vm-minus${elm.id}">-</a>
                            <input type="text" value="${arr[0].num}" max="${elm.num}" min="1" id="num" class="num${elm.id}">
                            <a href="javascript:;" class="vm-plus vm-plus${elm.id}">+</a>
                        </td>
                        <td class="cart-col-total">
                            <i>￥</i><span class="prices prices${elm.id}">${(elm.price*arr[0].num).toFixed(2)}</span>
                        </td>
                        <td class="cart-col-ctrl">
                            <a href="javascript:;" class="del" data-id="${elm.id}">删除</a>
                        </td>
                    </tr>
                </table>
            </li>`;
                $(function() {
                    let val = $(`.num${elm.id}`).val();
                    let sum = $(`.cart-price${elm.id}`).html();

                    function pri() {
                        let money = 0;
                        money = (val * sum).toFixed(2);
                        $(`.prices${elm.id}`).html(money);
                        console.log(money);
                    }
                    $(`.vm-minus${elm.id}`).on('click', function() {
                        if (val > 1) {
                            val--;
                            $(`.num${elm.id}`).val(val);
                            pri();
                        }
                    });
                    $(`.vm-plus${elm.id}`).on('click', function() {
                        val++;
                        $(`.num${elm.id}`).val(val);
                        pri();
                    });
                });
            });
            $('.cart-merchant-list').append(temp).find('.del').on('click', function() {
                let shop2 = shop.filter(el => el.id != $(this).attr('data-id')); // 获得id不匹配的元素
                cookie.set('shop', JSON.stringify(shop2), 1); // 将不匹配的元素从新写进cookie
                location.reload();
            });

        }
    });
}
$(function() {
    $(".checkbox").on('click', function() {
        $("input:checkbox").prop("checked", $(this).prop('checked'));
    })
    $("input:checkbox").on('click', function() {
        if ($("input:checkbox").length === $("input:checked").length) {
            $(".checkbox").prop("checked", true);
        } else {
            $(".checkbox").prop("checked", false);
        }
    });
});

// let selectInputs = $('.checkbox');
// console.log(selectInputs);
// let checkAllInputs = $('.check-all')
// console.log(checkAllInputs);
// for (var i = 0; i < selectInputs.length; i++) {
//     selectInputs[i].onclick = function() {
//         if (this.className.indexOf('check-all') >= 0) {
//             for (var j = 0; j < selectInputs.length; j++) {
//                 selectInputs[j].checked = this.checked;
//             }
//         }
//         if (!this.checked) {
//             for (var i = 0; i < checkAllInputs.length; i++) {
//                 checkAllInputs[i].checked = false;
//             }
//         }

//     }
// }