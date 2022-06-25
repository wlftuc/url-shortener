# URL Shortener



This URL shortener was made for 3 core reasons:

1. Learn TypeScript

2. Revisit Prisma

3. Learn more about relational databases 

## Cloning


1. Clone the repository
    ```git
    git clone https://github.com/wlftuc/url-shortener
    ```
2. Change directory
    ```bash
    cd url-shortener
    ```
3. Install dependencies
    ```bash
    npm install 
    ```

4. Start the server
    ```bash    
    npx next dev
    ```


## Environment Variables

1. `HASH_TOKEN` 

    Run ` openssl rand -base64 32` to generate one.

2. `DATABASE_URL`

    Your PostgreSQL database URL.

# Concept 


### Without Passwords
The concept of this project in itself *without* the password is pretty much straight-forward. This involves a process of 4-6 steps:

* Ask user for URL
* Generate a *unique* `slug` for the URL on the server
* Encrypt the URL using `AES`.
* Map the Encrypted URL to the previously generated `slug`

When the user visits the `slug` (https://example.com/mySlug):

* Server-side redirect them to the original link(which gets decrypted on the server)



### With Passwords

The original process pretty much remains the same. All we do is add a few steps in between.

* Ask user for URL
* Ask user if they want to *lock* the URL i.e. password protect it.
* If yes, ask them for the password.

* Generate a *unique* `slug` for the URL on the server
* Encrypt the URL using `AES`
* Hash the password using `SHA256`
* Map the Encrypted URL and password to the previously generated `slug` 

When the user visits the slug, they get asked to input the password. A few steps:

* If they input the correct password
    
    > Check by hashing the password and matching it with the one in the database
    * Client-side redirect them to the URL.
* If they input the incorrect password
    * Display a warning until the input the correct one.



## TODOs

- [x] Hash URLs
- [x] Add feature to make private URLs


