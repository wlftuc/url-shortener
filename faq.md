# How does this work?



The core concept of the URL shortener without the passwords in itself is quite straight-forward:

* Ask user for URl
* Generate a `slug` for the URl
* Encrypt the URL using AES
* Map the encrypted URL to the `slug`

Now, when the user visits the slug, they get redirected to the URL server-side.
