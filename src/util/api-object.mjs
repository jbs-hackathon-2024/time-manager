import OpenAI from "openai";
import fs from "fs";


const openai = new OpenAI({ apiKey: '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' });

async function main() {
  try {

    const tasks = [
        // Week 1
        { type: 'Homework', subject: 'Math', dueDate: '2/3 (mon)', estimatedTime: '30 mins' },
        { type: 'Essay', subject: 'English', dueDate: '2/5 (wed)', estimatedTime: '4 hours' },
        { type: 'Test', subject: 'Science', dueDate: '2/7 (fri)', estimatedTime: '2 hours' },
        { type: 'Homework', subject: 'Math', dueDate: '2/4 (tue)', estimatedTime: '30 mins' },
        { type: 'Homework', subject: 'Math', dueDate: '2/5 (wed)', estimatedTime: '30 mins' },
        { type: 'Homework', subject: 'Science', dueDate: '2/5 (wed)', estimatedTime: '1 hour' },
        { type: 'Project', subject: 'History', dueDate: '2/7 (fri)', estimatedTime: '3 hours' },
        { type: 'Reading', subject: 'Literature', dueDate: '2/3 (mon)', estimatedTime: '45 mins' },
        { type: 'Lab Report', subject: 'Biology', dueDate: '2/6 (thu)', estimatedTime: '2 hours' },
        { type: 'Research', subject: 'Science', dueDate: '2/5 (wed)', estimatedTime: '2 hours' },
        { type: 'Worksheet', subject: 'Geography', dueDate: '2/4 (tue)', estimatedTime: '1 hour' },
        { type: 'Quiz', subject: 'Spanish', dueDate: '2/6 (thu)', estimatedTime: '1 hour study' },
        { type: 'Book Report', subject: 'English', dueDate: '2/7 (fri)', estimatedTime: '2 hours' },
      
        // Week 2
        { type: 'Homework', subject: 'Math', dueDate: '2/10 (mon)', estimatedTime: '30 mins' },
        { type: 'Essay', subject: 'English', dueDate: '2/12 (wed)', estimatedTime: '3 hours' },
        { type: 'Test', subject: 'Chemistry', dueDate: '2/14 (fri)', estimatedTime: '3 hours' },
        { type: 'Homework', subject: 'Physics', dueDate: '2/11 (tue)', estimatedTime: '1 hour' },
        { type: 'Homework', subject: 'Math', dueDate: '2/13 (thu)', estimatedTime: '30 mins' },
        { type: 'Homework', subject: 'Biology', dueDate: '2/12 (wed)', estimatedTime: '1 hour' },
        { type: 'Project', subject: 'Art', dueDate: '2/14 (fri)', estimatedTime: '2 hours' },
        { type: 'Reading', subject: 'History', dueDate: '2/10 (mon)', estimatedTime: '1 hour' },
        { type: 'Presentation', subject: 'Geography', dueDate: '2/13 (thu)', estimatedTime: '2 hours' },
        { type: 'Research', subject: 'English', dueDate: '2/11 (tue)', estimatedTime: '2 hours' },
        { type: 'Worksheet', subject: 'Spanish', dueDate: '2/10 (mon)', estimatedTime: '45 mins' },
        { type: 'Quiz', subject: 'Math', dueDate: '2/13 (thu)', estimatedTime: '30 mins study' },
        { type: 'Group Project', subject: 'Science', dueDate: '2/14 (fri)', estimatedTime: '4 hours' }
      ];
      
      

    
    const tasksStr = JSON.stringify(tasks);

    const weeklySchedule = {
        Monday: [
            { time: "8:30 - 16:20", activity: "School" },
            { time: "16:40 - 18:00", activity: "Soccer Practice" },
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "21:00", activity: "Bedtime" }
        ],
        Tuesday: [
            { time: "8:30 - 16:20", activity: "School" },
            { time: "16:40 - 17:30", activity: "Music Lessons" },
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "21:00", activity: "Bedtime" }
        ],
        Wednesday: [
            { time: "8:30 - 16:20", activity: "School" },
            { time: "16:40 - 18:00", activity: "Soccer Practice" },
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "21:00", activity: "Bedtime" }
        ],
        Thursday: [
            { time: "8:55 - 16:20", activity: "School"  },
            { time: "16:30 - 17:00", activity: "Chess Club" },
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "21:00", activity: "Bedtime" }
        ],
        Friday: [
            { time: "8:30 - 14:50", activity: "School" },
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "22:00", activity: "Bedtime" }
        ],
        Saturday: [
            { time: "15:00 - 16:30", activity: "Soccer Game" },
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "22:00", activity: "Bedtime" }
        ],
        Sunday: [
            { time: "18:00 - 19:00", activity: "Dinner" },
            { time: "21:00", activity: "Bedtime" }
        ]
    };
    

    const scheduleStr = JSON.stringify(weeklySchedule);

  
    const assistant = await openai.beta.assistants.create({
        name: "Time manager",
        instructions: `Your goal is to help manage time effectively for middle school students over a two week period (assume the weekly schedule is consistent for both weeks), considering their schoolwork, extracurricular activities, and personal time. Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation:
        [{
            "date": "month/day",
            "tasks": [
              {
                "startTime": "start time as a double",
                "endTime": "end time as a double",
                "activity": "activity description",
                "estimatedTime": "predicted time to complete in minutes as a double",
                "dueDate": "month/day"
              },
              {
                "more tasks for the same day..."
              }
            ]
          },]`,
        model: "gpt-4-turbo-preview"
    });


    // Create a thread with the tasks
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: `Here are my weekly tasks: ${tasksStr}. Please organize them into this weekly schedule: ${scheduleStr}.`
        }
      ]
    });

    // Create a run to get the assistant's response
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });

    // Check run status and wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Retrieve the updated messages from the thread after the run is completed
    const updatedMessages = await openai.beta.threads.messages.list(thread.id);

    // get specidic response
    const assistantResponse = updatedMessages.data[updatedMessages.data.length - 2].content;

    console.log("Assistant's response:",  JSON.stringify(assistantResponse));

    const responseText = assistantResponse[0].text.value;

    const cleanedResponseText = responseText.replace(/^```json\n|\n```$/g, '');

    const schedule = JSON.parse(cleanedResponseText);

    const scheduleString = JSON.stringify(schedule, null, 2);

    const filePath = 'schedule.json';

    fs.writeFileSync(filePath, scheduleString);
    console.log(`Schedule saved to file: ${filePath}`);

    //console.log("Parsed Schedule:", schedule);

  } catch (error) {
    console.error("Error in processing:", error);
  }

}2

main();
