import { useState } from "react";

export default function addEvent() {
    const [formData, setFormData] = useState({
        event_name: "",
        event_description: "",
        type: "",
        event_time: "",
        completion_time: "",

    });
}