export const DUMMY_INCIDENTS = [
  {
    _id: "1",
    title: "Road Accident",
    description:
      "Two vehicles collided near the main market. A truck and a motorcycle were involved. The motorcycle rider is injured and has been taken to SN Medical College. Road is partially blocked.",
    severity: "critical",
    category: "Accident",
    status: "under_investigation",
    createdAt: new Date().toISOString(),
    location: {
      coordinates: [78.0081, 27.1767],
      address: "Main Market Road, Taj Ganj, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo:
      "Black truck, number plate UP-80 XX 1234, fled the scene heading towards Fatehabad Road.",
    policeStation: "Taj Ganj Police Station",
    updates: [
      {
        text: "Report received and assigned to patrol unit.",
        time: "2 min ago",
        by: "System",
      },
      {
        text: "Patrol unit dispatched to location.",
        time: "5 min ago",
        by: "Officer Sharma",
      },
    ],
  },
  {
    _id: "2",
    title: "Suspicious Activity",
    description:
      "Group of 4-5 unknown individuals loitering near the school boundary wall after midnight. They appeared to be checking the gate locks.",
    severity: "high",
    category: "Suspicious Activity",
    status: "reported",
    createdAt: new Date(Date.now() - 14 * 60000).toISOString(),
    location: {
      coordinates: [78.015, 27.18],
      address: "Near City School, Civil Lines, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo:
      "4-5 males, ages approximately 20-30, wearing dark clothing. One had a red jacket.",
    policeStation: "Civil Lines Thana",
    updates: [
      { text: "Report received and logged.", time: "14 min ago", by: "System" },
    ],
  },
  {
    _id: "3",
    title: "Street Light Out",
    description:
      "Entire stretch of road dark since 3 days. Multiple residents have complained. Two minor accidents already happened due to this.",
    severity: "medium",
    category: "Infrastructure",
    status: "reported",
    createdAt: new Date(Date.now() - 31 * 60000).toISOString(),
    location: {
      coordinates: [78.005, 27.172],
      address: "Sector 4, Kamla Nagar, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo: null,
    policeStation: "Sadar Bazar Chowki",
    updates: [
      {
        text: "Report received. Forwarded to municipal authority.",
        time: "31 min ago",
        by: "System",
      },
    ],
  },
  {
    _id: "4",
    title: "Chain Snatching",
    description:
      "A woman returning from the market had her gold chain snatched by two bike-borne individuals who fled immediately.",
    severity: "critical",
    category: "Theft",
    status: "resolved",
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    location: {
      coordinates: [78.02, 27.185],
      address: "Bus Stand, Platform 2, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo:
      "Two males on a black Honda Activa scooter. No helmet. One wearing blue shirt.",
    policeStation: "Taj Ganj Police Station",
    updates: [
      {
        text: "Suspects identified via CCTV footage.",
        time: "45 min ago",
        by: "Officer Kumar",
      },
      {
        text: "Suspects arrested. Case resolved.",
        time: "20 min ago",
        by: "Officer Kumar",
      },
    ],
  },
];
