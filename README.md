# BasicStudentList
Create Node.js server that uses MongoDb database for an automated student website.

How to Run:
1. Open your terminal go inside the serverside directory. Then run "node mongoServer.js"
2. Open index.html (located in the clientside folder) on a live server.
***Will not work if you do not run server first

Once running, you will see at the top of the page <br><img width="449" alt="Screen Shot 2022-01-12 at 3 37 39 AM" src="https://user-images.githubusercontent.com/78659700/149109611-58e5c289-0139-4b46-a381-58a96e2483fc.png">
<br>

If you're running for the first time, your database is empty so there will be no students displayed. Click "Add Student" to add students to your database.
After this, the default page when loaded will display all the students stored in your database. 

Features:
- Search: Search bar allows you to find student by their ID #.
<img width="519" alt="Screen Shot 2022-01-12 at 3 46 47 AM" src="https://user-images.githubusercontent.com/78659700/149114790-0779621d-98cc-4d52-a987-55c9c239ab2f.png">
- Add Student: Add student directs you to a form where user can input the student's information and add them to the database.
<img width="500" alt="Screen Shot 2022-01-12 at 3 44 09 AM" src="https://user-images.githubusercontent.com/78659700/149113272-eb1193f5-e080-47b9-9bff-1965aaf01732.png">
- Delete Student: Removes student from database and list on page.
<img width="485" alt="Screen Shot 2022-01-12 at 3 45 49 AM" src="https://user-images.githubusercontent.com/78659700/149114264-5140530e-57e7-478b-af7c-9e09edf69c03.png">
- Update Student: Allows user to update information of a student (excluding the student ID).
<img width="473" alt="Screen Shot 2022-01-12 at 3 44 46 AM" src="https://user-images.githubusercontent.com/78659700/149113608-ae3fff18-9869-4527-9bc2-101f91832758.png">
- Display List: Displays all students stored in database.
<img width="557" alt="Screen Shot 2022-01-12 at 3 42 54 AM" src="https://user-images.githubusercontent.com/78659700/149112508-876c9eb4-9249-4d4b-b645-8e9461de02cb.png">

To improve further, implement a UI kit into the client side directory.
