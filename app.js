// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50,
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150,
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500,
        },
    ],
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47,
        },
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150,
        },
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400,
        },
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39,
        },
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140,
        },
    },
];

// Check if assignment date has passed
function isValidDueDate(assignDate) {
    // Create a Date object for today's date
    const today = new Date();

    // Create a Date object for the date you want to compare with
    const otherDate = new Date(assignDate);

    // Compare the two dates
    if (otherDate.getTime() <= today.getTime()) {
        return true;
    } else {
        return false;
    }
}

// Check if submitted date accepted
function isValidSubmitDate(submitDate, dueDate) {
    // Create a Date object submitted date
    const sDate = new Date(submitDate);

    // Create a Date object for the date you want to compare with
    const dDate = new Date(dueDate);

    // Compare the two dates
    if (sDate.getTime() <= dDate.getTime()) {
        //console.log(`The submitted date ${sDate} is accepted by ${dDate}!`);
        return true;
    } else {
        // console.log(
        //     `They missed the due date of ${dDate} by submitting on ${sDate}.`
        // );
        return false;
    }
}

function getLearnerData(course, ag, submissions) {
    const result = [];
    const validAssignments = [];
    const learnerScores = {};
    let learnerID = "";
    let assignmentID = "";
    let submitDt = "";
    let learnerScore = "";
    let assignDueDate = "";
    let assginPoints = "";
    let penalty = "";

    // Check course id
    const courseID = course.id;
    console.log(courseID);

    //console.log(ag.assignments);

    // Get valid assignments

    for (let i = 0; i < ag.assignments.length; i++) {
        if (isValidDueDate(ag.assignments[i].due_at)) {
            validAssignments.push(ag.assignments[i]);
        }
        //console.log(validAssignments[i]);
    }
    //console.log(validAssignments);
    // console.log(validAssignments[1].id);
    // console.log(validAssignments[2].id);

    for (let i = 0; i < submissions.length; i++) {
        const learner_id = submission.learner_id;
        const assignment_id = submission.assignment_id;
        const submitted_at = submission.submission.submitted_at;
        const score = submission.submission.score;
    }

    //return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//console.log(result);

// The final result should be:
//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];
