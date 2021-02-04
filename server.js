import express from 'express';
import { studentList } from './students.js';

const app = express();
let students = studentList;
let sortedBy = 'name';
let reverseSort = false;

app.listen(3000, () => {
  console.log("Server running");
});
app.get("/students", (req, res) => {
  const params = req.query;
  const startIndex = +params.index;
  const endIndex = startIndex + 5;

  // Checking for sorting method changes
  if (params.sortBy !== sortedBy) {
    sortedBy = params.sortBy;
    sortStudents(params.sortBy);
  }
  let result = students
      .filter(student => student.name.toLocaleLowerCase().includes(params.search.toLocaleLowerCase()));
  if (params.reverseSort !== reverseSort) {
    reverseSort = params.reverseSort;
    students.reverse();
  }
  // When scrolled past the end, eg. endIndex is out of bounds
  // result equals to last 5 students
  endIndex > result.length ?
      result = result.slice(result.length-5, result.length) : result = result.slice(startIndex, endIndex);
  res.json(result);
});
// Sorts the students array by given sortBy method
// by default sorted by name
function sortStudents(sortBy) {
  students = students.sort((student1, student2) => {
    if (student1[sortBy] < student2[sortBy]) {
      return -1;
    }
    if (student1[sortBy] > student2[sortBy]) {
      return 1;
    }
    return 0;
  })
}
