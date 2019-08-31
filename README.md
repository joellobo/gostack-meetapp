# MeetApp basic requisits

## Authentication

[x] The user can login using e-mail and password.
[x] I have used JWT to authenticate the user.
[x] All login fields are checked via Yup.

## User register and update

[x] The user can register using name, e-mail and password.
[x] To update the password user need to send a password confirmation and the old password.
[x] User passwords are all encripted.
[x] All register and update field requests are checked via Yup.

## MeetUp subscription

[x] The user can subscribe to meetups that are not of him.
[x] The user can't subscribe to meetups that already happened.
[x] The user can't subscribe to the same meetup two times.
[x] The user can't subscribe to meetups that happen at the same time.
[x] The owner of the meetup receive a email when a user subscribe to one of his meetups.

## MeetUps list

[x] MeetUps can be list by date and are paged by 10 meetups.

## Subscription list

[x] There is a route to list all future meetups that the current user is subscribed.

# Extra

- Added some animation to the mobile application when user enter in some screen or changes the date of filter of the meetups.
- Added a splash screen to the mobile app.
- Added a icon to the mobile app.
- Added differente messages to each error, these messages are coming from the backend and showed on forntend by toasts.
- Added styled toasts to the mobile app instead of the default Alert of react-native.
- Added tests to the session controller and the user controller.

# Possible improvements

- Add field validation to the mobile application.
- Add some animations to the mobile and web application.
- Create tests for ALL the controllers and components.
- Add cache to routes like the meetup list route.
