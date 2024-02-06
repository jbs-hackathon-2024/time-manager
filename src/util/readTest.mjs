import fs from 'fs/promises';

const filePath = './schedule.json'; 

async function readAndTransformJSON(filePath) {
    try {
        // Read the JSON file
        const data = await fs.readFile(filePath, 'utf8');

        // Parse the JSON data
        const daysData = JSON.parse(data);

        // Transform the data into a flat array of tasks with their respective dates
        const tasks = daysData.flatMap(day => 
            day.tasks.map(task => ({
                ...task,
                date: day.date
            }))
        );

        console.log(tasks);
        return tasks; // Returns a flat array of tasks, each with a date
    } catch (err) {
        console.error('Error reading or parsing the file:', err);
    }
}

readAndTransformJSON(filePath);
