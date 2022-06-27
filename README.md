# URL Shortener



This URL shortener was made for 3 core reasons:

1. Learn TypeScript

2. Revisit Prisma

3. Learn more about relational databases 

4. Implement some concepts I recently learned about.



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
    This token will be used to encrypt your URLs using [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)

2. `DATABASE_URL`

    Your PostgreSQL database URL.


## TODOs

- [x] Hash URLs
- [x] Add feature to make private URLs
- [x] Add ChakraUI
- [x] Show shortened URLs in a sidebar-like drawer
- [x] Add Dark Mode support



