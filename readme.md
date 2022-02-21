# Student Performance Improvement System

## Introduction

This program is built for the UCDF2005ICT(DI) SDP assignment. This system that is being built will focus on helping students to improve their grades by showing what topics in a specific subject that they're weak at. Due to several limitations, not all features that are mentioned will be implemented fully. This student monitoring program created using MERN stack

## Getting started with the project

### `./server/constant.js` folder

1. Assign all values required in the `.env` file as mentioned above

### `npm data:import`

2. Import `Course` into database to retrieve course `_id` before seeding other entities.

### `npm run start` or `npm run server`

3. Run `node/nodemon index.js` command in bash terminal to run in development mode.

## Flow of System

### Students

1. Students will first log into the system using their school email and password.
2. After logging in, students will land on the dashboard where there is an overview of their course, including Tasks, Grades, and Assignments due.
3. Students can choose to navigate to other tabs using the navigation bar at the very top.
   1. Resources tab
      1. By clicking into this tab, students will be able to see a list of resources that are shared by their lecturer. Resources could be files or external links
   2. Assignments tab
      1. By clicking into this tab, students can access all the assignments that are assigned to them by their lecturers.
      2. By clicking on one of the assignments, students will be brought to Assignment Details page (uploadedBy, due date, topic, etc.) as well as a place for the students to upload their completed assignment.
   3. Messages tab
      1. The messages tab will open a page where students can access a list of contacts at the left and after choosing a contact, they can chat with them at the right (something like WhatsApp)
   4. Dashboard
      1. Clicking on this would just bring them back to the Dashboard

### Lecturers

The flow for Lecturers will be similar to Students. Just that some functionalities in the pages are different

1. Lecturers can first log into the system using their work email given by the university.
2. After logging in, Lecturers will also land on the dashboard.
3. Lecturers can also navigate to other pages using the navigation bar.
   1. Resources tab
      1. Lecturers can upload resources into the Resources tab by clicking on the '+' button in this page.
   2. Assignments tab
      1. Lecturers can add new assignments that will be later assigned to students
      2. By clicking into the specific assignment that was previously uploaded, lecturers can choose to either edit the assignment or assign it to students enrolled in the course
      3. Lecturers also have a list view of which student submitted the assignment and grade them accordingly.
   3. Messages tab
      1. Lecturers will use this tab to respond or initiate conversations with their students.
      2. Layout is similar to WhatsApp.

## Features to be implement

1. Lecturer able to keep track on number of students that have received the assigned task. /
2. Lecturer able to view grading history. /

## Limitations

1. 1000/mnth email api request within 5 authorised account (mailgun)
2. 1 gb file storage (cloudinary)
