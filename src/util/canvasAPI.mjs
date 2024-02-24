import fetch from 'node-fetch';

const canvasBaseUrl = 'https://jburroughs.instructure.com/api/v1';
const accessToken = process.env.CANVAS_KEY;

export async function listYourCourses() {
    const response = await fetch(`${canvasBaseUrl}/courses?enrollment_state=active&per_page=50`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const courses = await response.json();

    const calendarUrls = courses.map(course => ({
        name: course.name,
        calendarUrl: course.calendar ? course.calendar.ics : 'No calendar URL'
    }));
    console.log('Calendar URLs:', calendarUrls);
    return courses;
}

export async function getClassNames(){
    const response = await fetch(`${canvasBaseUrl}/courses?enrollment_state=active&per_page=50`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const courses = await response.json();

    const courseNames = courses.map(course => ({
        name: course.name,
    }));
    //console.log(courses);
    //console.log('Course names:', JSON.stringify(courseNames));
    return courses;
}

export async function getAssignmentsForCourse(courseId) {
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
//getClassNames();
//getAssignmentsForCourse('6758'); 
