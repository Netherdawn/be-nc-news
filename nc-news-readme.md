# README

This is the readme for the nc news website.
The nc news website is your one stop shop for discussing a variety of topics
One can create a profile, vote on an article or comment, discuss topics with articles or discuss people discussing topics with a comment. Cursing like a sailor is optional.

# Website

# Endpoints

visit https://news-app-from-bootcamp.herokuapp.com/api for a json object of all availabile endpoints and paramters.
Alternatively, you can head to the endpoints.json file to see the same endpoints and paramters.

```http
GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api
```

# Installation

To install

- Please have visual code editor or a similar code editting software.

- Open your terminal (Mac: command + space or Linux: crt + alt + t) and enter the command below

```bash
git clone https://github.com/brork/be-nc-news

cd be-nc-news
```

- The program requires the following dependancies to be added to package.json file

```json
  "dependencies": {
    "express": "^4.17.1",
    "knex": "^0.20.10",
    "pg": "^7.18.2"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "chai-sorted": "^0.2.0",
    "mocha": "^7.0.1",
    "sams-chai-sorted": "^1.0.2",
    "supertest": "^4.0.2"
  }
```

- run the following command in your terminal

```bash
npm install
```

# Contact

Any contact can be directed to user Brork on github.

# Notice

This software is protected under the inter-galatic high council of planetary governmental bodies. Dissenters will be vaporised
