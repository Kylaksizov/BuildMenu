# BuildMenu 1.0 - Jqury plagin
Query плагин для автоматического создания меню.

<h2><a href="http://kylaksizov.ru/demo/4/index.php" target="_blank">DEMO</a>.</h2>

## Установка

### Подключите файлы

```html
<link rel="stylesheet" type="text/css" href="css/buildmenu.min.css">
<script src="js/buildmenu-1.0.min.js"></script>
```

### Инициализация плагина

```html
<script>
    $(function(){
        $("element").buildMenu();
        // element - любой элемент вида <div>, <p>, .class, #id ...
    })
</script>
```

### Настройки плагина

```html
$(function(){
    $("element").buildMenu({
        menuHide: true,       // true - скрывать меню, false - не скрывать
        speedShowMenu: 300,   // скорость появления меню
        speedHideMenu: 500,   // скорость скрытия меню
        startBuild: 50,       // сколько пикселов нужно прокрутить от верха, что бы появлялось меню?
        scrollTopBlock: 50,   // отступ сверху до активного блока при нажатии на меню
        jointMenu: 1,         // cколько пунктов меню оставлять слева
        activeMenu: "center", // инициализация активного пункта меню при появлении блока на экране
                              //(количество пикселов от верхней границы окна браузера до блока px|"center")
        speedScroll: 1000     // скорость прокрутки блоков при нажатии на меню
    });
})
```

Если возникли вопросы, пишите комментарии на сайте автора: <a href="http://kylaksizov.ru/63-avtomaticheskoe-menyu-na-sayte-plagin-buildmenu.html" target="_blank">kylaksizov.ru</a>