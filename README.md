# post-app-be

## Notes

Usually, the `.env` files would be omitted from source control, but in this case, I'm including them since there is no sensitive data in this project and it will make running and testing the app much easier. I realise that exposing this data in source control is a security risk in production applications, but for the sake of the test assignment, I'm keeping them for the ease of the reviewer.

## Details

### Database

This project is using MongoDB with `mongoose` ORM. To run the project, you will need either a local instance of MongoDB or you can use direct link from Mongo Atlas cluster

## Requirements

- NodeJS v16