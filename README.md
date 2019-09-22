# MeetApp basic requisits

## Authentication

- [x] The user can login using e-mail and password.
- [x] I have used JWT to authenticate the user.
- [x] All login fields are checked via Yup.

## User register and update

- [x] The user can register using name, e-mail and password.
- [x] To update the password user need to send a password confirmation and the old password.
- [x] User passwords are all encripted.
- [x] All register and update field requests are checked via Yup.

## MeetUp subscription

- [x] The user can subscribe to meetups that are not of him.
- [x] The user can't subscribe to meetups that already happened.
- [x] The user can't subscribe to the same meetup two times.
- [x] The user can't subscribe to meetups that happen at the same time.
- [x] The owner of the meetup receive a email when a user subscribe to one of his meetups.

## MeetUps list

- [x] MeetUps can be list by date and are paged by 10 meetups.

## Subscription list

- [x] There is a route to list all future meetups that the current user is subscribed.

# Extra

- Added a splash screen to the mobile app.
- Added a icon to the mobile app.
- Added differente messages to each error, these messages are coming from the backend and showed on forntend by toasts.
- Added styled toasts to the mobile app instead of the default Alert of react-native.
- Added tests to the session controller and the user controller.
- Web responsive layout.

# Possible improvements

- Add field validation to the mobile application.
- Add some animations to the mobile and web application.
- Create tests for ALL the controllers and components.
- Add cache to routes like the meetup list route.
- Support to iOS.

# Running the project

- Yout need to set up all the react-native enviroment.
- Install docker and create a postgres and redis container.
- Clone this repository.
- Install all dependencies using the command `yarn` in each directory, backend, mobile and frontend.
- Enter backend directory and fill the `.env` file.
- Enter backend directory and run `yarn run-dev`.
- Enter frontend directory and run `yarn start`.
- Enter mobile directory and run `react-native run-android` while you are running a Android emulator.

## Observation:

- I wasn't able to test the application on iOS because I don't have a MacBook to do it.

## Redis
- sudo docker pull redis:3.0.7
- sudo docker images
- sudo docker run -d -p 6379:6379 -i -t redis:3.0.7
- sudo docker ps
- docker exec -it dc0842cec264 bash
- ./redis-cli

## Postgres
- docker run -d --name my_postgres -v my_dbdata:/var/lib/postgresql/data -p 54320:5432 postgres:11
- docker exec -it my_postgres psql -U postgres
