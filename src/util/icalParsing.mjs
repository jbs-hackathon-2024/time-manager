import ical from 'node-ical';
import fetch from 'node-fetch';

export async function fetchAndParseiCal(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const events = ical.parseICS(data);
    //console.log('Parsed Events:', Object.keys(events).length, 'events found');
    return events;

  } catch (error) {
    console.error('Error fetching or parsing iCal:', error);
  }
}


export async function fetchAndParseiCal(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const events = ical.parseICS(data);

    for (const [key, event] of Object.entries(events)) {
      if (event.start) {
        event.start.setDate(event.start.getDate() - 1);
      }
      if (event.end) {
        event.end.setDate(event.end.getDate() - 1);
      }
    }

    return events;

  } catch (error) {
    console.error('Error fetching or parsing iCal:', error);
  }
}


export function filterEventsByTimeRange(events, startTime, endTime) {
    const filtered = Object.values(events).filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
       //console.log(`Event Start: ${eventStart} Event End: ${eventEnd}`); 
        return eventStart >= startTime && eventEnd <= endTime;
    });
    return filtered;
}

async function main() {
    const icalUrl = 'https://jburroughs.instructure.com/feeds/calendars/course_FoqMA80RvbcmUh8IIHMBBOjMiTKxJ0cZptvNS7wP.ics';
    const events = await fetchAndParseiCal(icalUrl);
  
    const startTime = new Date('2024-02-06');
    const endTime = new Date('2024-02-7');


    console.log(`Filtering events between: ${startTime} and ${endTime}`); 
    const filteredEvents = filterEventsByTimeRange(events, startTime, endTime);
  
    console.log('Filtered Events:', filteredEvents.length, 'events filtered');
    console.log(filteredEvents);
}

main();