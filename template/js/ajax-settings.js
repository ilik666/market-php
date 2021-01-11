"use strict";

document.addEventListener('DOMContentLoaded', function () {
    var recording = $plugins.modal({
        title: 'Заказать онлайн звонок',
        closable: true,
        width: '400px',
        content: "\n\t\t\t<form>\n\t\t\t\t<input type='text' placeholder='\u0418\u043C\u044F' required> \n\t\t\t\t<input type='tel' class='number' placeholder='\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430' required> \n\t\t\t\t<button class='g-btn g-btn--accent'> \u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A </button>\n\t\t\t\t<p>\n\t\t\t\t\t\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0443, \u0412\u044B \u0434\u0430\u0435\u0442\u0435 \u0441\u0432\u043E\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \n\t\t\t\t\t<a href=\"#\" target=\"_blank\">\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445</a>\n\t\t\t\t</p>\n\t\t\t</form>\n\t\t"
    });
    document.addEventListener('click', function (e) {
        if (e.target.tagName == 'BUTTON' && e.target.dataset['showModal']) {
            recording.open(); // setTimeout( ( ) => ), 200)
        }
    });
});