# Interview Scheduler
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. 

The front end of this project is built with React and makes requests to an API using Axios to fetch and store appointment data from a database. The development environments utilized are Storybook, Jest, and Webpack Dev Server.

## Setup

- Install dependencies with `npm install`.
- Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory, and follow the README.md instructions. This will involve a few steps, including:
  - installing dependencies
  - creating the database
  - creating a .env.development file in the root directory
  - seeding the database
  - running the server


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Screenshots

### Main View
![Scheduler App by Chérie Oduwole](https://github.com/cherieodu/scheduler/blob/master/public/images/Main%20View.JPG?raw=true)
<br><br>
### On Edit
![Scheduler App by Chérie Oduwole](https://github.com/cherieodu/scheduler/blob/master/public/images/Edit%20View.JPG?raw=true)
<br><br>
### On Delete
![Scheduler App by Chérie Oduwole](https://github.com/cherieodu/scheduler/blob/master/public/images/Delete%20View.JPG?raw=true)