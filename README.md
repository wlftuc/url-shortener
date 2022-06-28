# URL Shortener



An intuitive url shortener made within a few days, with some neat features.





## Contributing

I made this project to revise a few fundamental concepts in the Node.js ecosystem. Contributions are not needed, but very much open. To contribute:


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

Once you add the feature you want to, create a branch with the feature's and send a PR.


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



