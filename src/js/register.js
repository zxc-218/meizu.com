import './library/jquery.js';
$(function() {
    $('#phone').on('input', function() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '../../interface/hasuser.php?phone=' + this.value);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);

                if (data.has) {
                    $('#msg').removeClass('green').addClass('red');
                } else {
                    $('#msg').removeClass('red').addClass('green');
                }
                $('#msg')[0].innerHTML = data.msg;
            }
        }
    });
});