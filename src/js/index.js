import './library/jquery.js';
import './jquery-1.11.0.min.js';
import './jquery.lazyload.min.js';

$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        let temp = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            // console.log(picture);
            temp += `<li class="phone">
            <a href="../html/product.html?id=${elm.id}">
                <img class="goods-img2" src="../${picture[0].src}" alt="">
                <span class="phone-info">
                    <span class="goods-name">${elm.title}</span>
                <span class="goods-desc">${elm.title1}</span>
                <span><i>￥</i>${elm.price}</span>
                </span>
            </a>
        </li>`;
        });

        $('.list').append(temp);
    }
});
$(function() {
    $("img.lazy").lazyload({
        effect: "fadeIn",
    })
})