# recipe-book-api

The api middleware for the recipe book app I have been developing. {complete later}

## Documentation (Swagger)

This API has been designed to conform with the OpenAPI 3.0 standard. The swagger documentation page of the available routes for this API can be found at the following route:

```
http://localhost:4444/swagger/
```

## Development

do later

### Testing

do later

## Deployment

This API has been setup with Docker support from the outset. An image of this app can be created using the docker build command as seen below. (insert-name marks where you can set the Docker image name, the -t flag allows this name tag to be allocated)

```
docker build . -t insert-name
```

To load this Docker image into a container, the docker run command is used as follows with the name selected for the image in the previous step in place for insert-name.

```
docker run -p 4444:4444 -d insert-name
```

NOTE: The Dockerfile has been configured to run on port 4444. The app can be run on another port by replacing the first 4444 in the command above with your own choice of port.
