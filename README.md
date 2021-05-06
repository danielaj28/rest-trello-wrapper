# REST-trello-wrapper

A simple node REST API wrapper to simplify calls from multiple systems.

## Background

The [Trello API](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/) is awesome! However when I just want to add a new card to list A on trello board B I don't want to perform all the calls to get the details each time of what the ID is for the board and what the ID is for the list, I just want to say add it to list A on board B. I don't want to have to worry about rate limits. I only want to provide a simple model.

## Aims

1. RESTful endpoint for creating a card: /board/{BoardName}/list/{listName} Body:{"title":"Title text goes here"}
2. If the board ID is not known, lookup and cache
3. If the list ID is not known, lookup and cache
4. Add the card
5. If the request could not be added immediately due to rate limiting, queue to be sent later

## How to setup

1. Clone the repo
2. Run `npm i` to install dependendies
3. [Get an access key and token from Trello](https://trello.com/app-key)
4. Run `node newKey.js {length}` to generate a new access key of given length (this will also create the config.json file)
5. In the config add the trello key to the config trello.key
6. Add the Trello token to the config trello.token
7. Add you Trello username to the config trello.member
8. Run the API using ` node .`

To run on docker:

```
docker build -t resttrellowrapper:latest .
docker create -p 15971:3000 -e PORT=3000 --name "REST-Trello-Wrapper" --restart "always" resttrellowrapper:latest "node" "index.js"
docker start "REST-Trello-Wrapper"
```

## Interacting with the API

There is currently one main endpoint for creating cards, this is the following:

### Create a new Card

HTTP Method: POST

URI: /board/{BoardName}/list/{listName}

Body:

```json
{
  "title": "Title text goes here"
}
```
