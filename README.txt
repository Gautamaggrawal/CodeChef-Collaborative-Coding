# Collaborative Coding

Collaborative Coding is a  platform where users can learn with other users, share ideas and create live discussion groups  through voice and video chat. It also users to invite friends and join groups to solve a particular problem.

## Key Features of Collaborative Coding
    * Create a discussion group (voice & video)
    * Invite friends or join other groups

## Tech Stack Used 
    * Angular
    * NodeJS
    * MongoDB
    * CodeChef API
    * TOKBOX VIDEO EMBED API

## Configuration 

1. Add url of the angular cli to node_server
    ```
    "angularUrl": ["{{Add your domain}}"] (e.g http:localhost:4200)
    ```

2. Get client_id and client_secret from CodeChef API and redirect_uri as http://{{Add your domain}}:3000/oauth/codechef
    * Add client_id in angular config path: angweb/src/environments/environment.ts and change redirect_uri as mentioned in CodeChef
        ```
        codeChefLoginUrl: 'https://api.codechef.com/oauth/authorize?
        response_type=code&client_id=xxxxxxxxxxxxxx&state=xyz&redirect_uri=http://{{Add your domain}}:3000/oauth/codechef'
        ```
    * Add client_id and client_secret in NodeJS config path: node_server/config.json and redirect_uri as mentioned in CodeChef
        ```
        "redirectUrl": "xxxxxxxxxxxxxxx"
        "client_id": "xxxxxxxxxxxxxxx"
        "client_secret": "xxxxxxxxxxxxxxx"
        ```

3. Get embedId from TOKBOX Video embed URL
    * Add embedId in node_server config path:node_server/config.json
        ```
        videoApiUrl: "https://tokbox.com/embed/embed/ot-embed.js?embedId=xxxxxxxxxxxxxxx&iframe=true&room="
        ```
        
4. Setup MongoDB
    * Add MongoDB url in node_server path:node_server/config.json
        ```
        "mongoDbUrl": "xxxxxxxxxxxxxxx"
        ```

## Setup for Development -

For commands for setup refer setupDev.txt

1.Node installation
    For Windows 
    ```
    https://nodejs.org/en/
    ```
    
    For Linux 
    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
    nvm install stable
    ```

2. Angular web client installation
    ```
    npm install -g @angular/cli
    ```

3. Install git

4. Clone repo url -

5. Install node modules and Run
    * For Angular web
    ```
    cd CodeChef/angweb
    npm install
    ```
    * Start Angular Server
    ```
    ng serve
    ```
    * For Node Server 
    ```
    cd CodeChef/node_server
    ```
    npm install
    ```
    * Start node_server
    ```
    npm start
    ```
