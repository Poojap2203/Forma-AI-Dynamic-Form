\# Forma AI – Insurance Claim Form



\## 1. Incident Details



| Field | Type | Required |

|---|---|---|

| Incident Type | Select | Yes |

| Date of Incident | Date | Yes |

| Time of Incident | Time | Yes |

| Location | Text | Yes |

| Was Anyone Injured? | Boolean | Yes |

| Who Was Injured? | Select | If injured |

| Injury Description | Text | If injured |

| Police Report Filed | Boolean | Yes |

| Police Station | Select | If report filed |

| FIR Number | Text | Optional |

| Incident Description | Textarea | Yes |



\## 2. Vehicle \& Damage



| Field | Type | Required |

|---|---|---|

| Vehicle Type | Select | Yes |

| Vehicle Make/Model | Text | Yes |

| Vehicle Number | Text | Yes |

| Damage Description | Textarea | Yes |

| Damaged Parts | Array | Yes |



\## 3. AI Extraction



The user can describe the incident in normal language.



\### Example Input



"I was driving my car on MG Road, Bangalore on 18 May

2025 at around 10:30 AM. Another car came from the front

and hit my vehicle. The front bumper and windshield were

damaged. My passenger had minor cuts on the hand."



\### Expected JSON



```json

{

&#x20; "incidentType": "Road Accident",

&#x20; "date": "2025-05-18",

&#x20; "time": "10:30",

&#x20; "location": "MG Road, Bangalore",

&#x20; "injured": true,

&#x20; "injuredPerson": "Passenger",

&#x20; "injuryDescription": "Minor cuts on hand",

&#x20; "policeReportFiled": null,

&#x20; "policeStation": null,

&#x20; "firNumber": null,

&#x20; "incidentDescription": "Another car came from the front and hit the vehicle.",

&#x20; "vehicle": {

&#x20;   "type": "Car",

&#x20;   "makeModel": null,

&#x20;   "vehicleNumber": null

&#x20; },

&#x20; "damage": {

&#x20;   "description": "Front bumper and windshield were damaged.",

&#x20;   "damagedParts": \[

&#x20;     "Front bumper",

&#x20;     "Windshield"

&#x20;   ]

&#x20; }

}

