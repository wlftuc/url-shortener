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

## Concept 

1. Ask user for URL

2. Generate a slug on the server

3. Store the slug with the hashed URL on the backend

4. When the user visits the slug, server-side redirect them to the original URL.

## TODOs

- [x] Hash URLs
- [x] Add feature to make private URLs
- [ ] If slug is not found in database, ask the user if they meant the *closest* matching slug instead.


