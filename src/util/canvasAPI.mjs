import fetch from 'node-fetch';

const canvasBaseUrl = 'https://jburroughs.instructure.com/api/v1';
const accessToken = '8302~L8Akh0FhoB2Mr9YY7Gxd0M2C944Z56qro9RmBSQsDi28xkqnHk7SzbfTyIvwjgPv'; 

async function listYourCourses() {
    const response = await fetch(`${canvasBaseUrl}/courses?enrollment_state=active`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const courses = await response.json();

    const calendarUrls = courses.map(course => ({
        name: course.name,
        calendarUrl: course.calendar ? course.calendar.ics : 'No calendar URL'
    }));
    //console.log(courses);
    console.log('Calendar URLs:', calendarUrls);
    return courses;
}

async function getAssignmentsForCourse(courseId) {
    const response = await fetch(`${canvasBaseUrl}/courses/${courseId}/assignments`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const assignments = await response.json();

    const descriptions = assignments.map(assignment => ({
        name: assignment.name,
        description: assignment.description ? assignment.description : 'No calendar URL'
    }));
    console.log(descriptions);
    return assignments;
}




listYourCourses();
//getAssignmentsForCourse('6758'); 
