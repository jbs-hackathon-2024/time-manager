import { listYourCourses } from './canvasAPI.mjs';
import { organizeScheduleWithGPT } from './assistantFinal.mjs';
import { fetchAndParseiCal } from './icalParsing.mjs';
import { filterEventsByTimeRange } from './icalParsing.mjs';

export default async function getOrganizedSchedule(date1, date2) {
    try {
        // Step 1: Fetch iCal URLs for all courses
        const courseDetails = await listYourCourses();
        console.log('Retrieved course details:', courseDetails);

        // Collect all events in this array
        let allEvents = [];

        const startTime = new Date(date1);
        const endTime = new Date(date2);

        for (const course of courseDetails) {
            const url = course.calendar?.ics;
            if (!url) {
                console.log(`No iCal URL for course ${course.name}`);
                continue;
            }

            // Step 2: Fetch and parse iCal data for each course URL
            const events = await fetchAndParseiCal(url);
            if (!events) {
                console.log(`No events found for URL ${url}`);
                continue; 
            }

            const filteredEvents = filterEventsByTimeRange(events, startTime, endTime);
            allEvents = allEvents.concat(filteredEvents);
            console.log(`Filtered events for ${course.name}:`, filteredEvents.length);
        }

        console.log(allEvents);

        const presetSchedule = {
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
          ],
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

        // Step 3: Organize Schedule with GPT for all courses at once
        if (allEvents.length > 0) {
            console.log("Passed to GPT");
            const organizedSchedule = await organizeScheduleWithGPT(allEvents, presetSchedule);
            console.log("GPT finnished");
            //console.log(`Organized Schedule:`, organizedSchedule);
        } else {
            console.log('No events to organize.');
        }
    } catch (error) {
        console.error('Error during full test:', error);
    }
}

getOrganizedSchedule('2024-02-10', '2024-02-18');
