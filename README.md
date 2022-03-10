# post-app-be

## Notes
Usually, the `.env` files would be omitted from source control, but in this case, I'm including them since there is no sensitive data in this project and it will make running and testing the app much easier. I realise that exposing this data in source control is a security risk in production applications, but for the sake of the test assignment, I'm keeping them for the ease of the reviewer.

### Database

This project is using MongoDB with `mongoose` ORM. To run the project, you will need either a local instance of MongoDB or you can use direct link from Mongo Atlas cluster

### Deployment
This application is deployed on Heroku. After the code has been pushed to GitHub, I connected Heroku with GitHub
in order to connect application code for deployment process. Add .env variables to the environment variables section on Heroku. And lastly I set up automatic deploy.

### Requirements

- NodeJS v16