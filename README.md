h5validator.js
=====================

This is client-side validation for HTML5.

Usage
---------------------

- Via data attributes

    ```
    <form class="js-h5validator" data-validClass="success" data-invalidClass="error" data-events="change">
       ...
    </form>
    ```

- Via JavaScript

    ```
    $('#form').h5validator({
        validClass  : 'success',
        invalidClass: 'error',
        events      : 'change'
    });
    ```
