

import * as express from 'express';
import {Application} from "express";
import {getAllCourses, getCourseById} from "./get-courses.route";
import {searchLessons} from "./search-lessons.route";


const app: Application = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);




const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




