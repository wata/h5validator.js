validate.js
=====================

This is client-side validation (HTML5).

Usage
---------------------

- Via data attributes

    ```
    <form class="js-validate" data-validClass="success" data-invalidClass="error" data-events="change">
       ...
    </form>
    ```

- Via JavaScript

    ```
    $('#form').validate({
        validClass: 'success',
        invalidClass: 'error',
        events: 'change'
    });
    ```