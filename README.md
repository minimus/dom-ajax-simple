Working with DOM and AJAX
=========================

Demo
----

Demo site: https://minimus.github.io/dom-ajax-simple/

The task
--------

1. Register and create API key on [https://newsapi.org](https://newsapi.org)
1. When you get api key test that it works as expected. Fill it in next request and test with browser: https://newsapi.org/v1/articles?source=bbc-news&apiKey={{YOUR_API_KEY}}
1. Using newsapi as a data source write a web application that:
    1. Make a call to api
    1. Process all news data
    1. Display them on the page
        1. The image should be displayed, no just link
        1. Add proper styling to have you application great look
    1. Write clean solution with moder EcmaScript 2015 syntax.
1. Don’t forget to put an attribution link to the bottom of the page as newapi desire from you.

Changelog
---------

The changes according to reviewer recommendations.

Recomendations:

1. Не использовать fetch на прямую. Как минимум созадть функцию-helper. Попытаться разобраться почему важно так делать.
1. Постараться вынести всю логику работы с DOM в отдельные методы.
1. Написать функцию-конструктор или класс, который будет являться сущностью новости. Написать функцию которая умеет генерировать html для объектов новостей. Больше думать в нарпавлении объектов и их взаимодействий, а не прямого манипулирования данными (принципы построения ооп приложений могут здорово помочь). Разобраться почему это может быть важно.
1. Добавить обработку ошибки, когда запрос к серверу упадет. При ошибке вывести сообщение пользователю что запрос не удался. Протестировать с помощью выключения доступа в интернет.
1. Сейчас код представляет собой очень длинные функции, которые сложно. В асинхронной логике fetch есть длинные код который лучше вынести в функции.
1. Один fetch написан с сипользования async/await. Второй просто использует promise chain и дублирует логику первого. Явное место для улучшения и рефакторинга
