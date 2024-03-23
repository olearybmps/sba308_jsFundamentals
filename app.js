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
        return true;
    } else {
        return false;
    }
}

function getLearnerData(course, ag, submissions) {
    const result = [];
    const validAssignments = [];
    const learnerScores = {};

    // Check course id
    try {
        if (course.id !== ag.course_id) {
            throw new Error("Incorrect course IDs.");
        }
    } catch (error) {
        console.error(error.message);
        return result;
    }

    // Get valid assignments
    for (let i = 0; i < ag.assignments.length; i++) {
        if (isValidDueDate(ag.assignments[i].due_at)) {
            validAssignments.push(ag.assignments[i]);
        }
    }

    //Loop through submissions; Find matching assignments
    //Validate submissions and assignments
    //Define, calculate and assign score, points, and avg's
    for (let i = 0; i < submissions.length; i++) {
        //One submission array
        const submission = submissions[i];
        const learner_id = submission.learner_id;
        const assignment_id = submission.assignment_id;
        const submitted_at = submission.submission.submitted_at;
        const score = Number(submission.submission.score);

        if (isNaN(score)) {
            throw new Error("The score property must be a number.");
        }

        // Find assignment match and get assignment obj and exit if found
        // Otherwise continue
        let assignment;
        for (let j = 0; j < validAssignments.length; j++) {
            if (validAssignments[j].id === assignment_id) {
                assignment = validAssignments[j];
                break;
            }
        }
        if (!assignment) continue;

        const assignDueDate = assignment.due_at;
        const assignPoints = Number(assignment.points_possible);

        if (isNaN(assignPoints)) {
            throw new Error("The assignPoints property must be a number.");
        }

        // Check possible points is not zero
        if (assignPoints === 0) {
            console.warn(
                `Assignment ${assignment_id} has zero possible points.`
            );
            // Skip processing this submission
            continue;
        }
        // Calculate penalty
        const penalty = isValidSubmitDate(submitted_at, assignDueDate)
            ? 0
            : assignPoints * 0.1;

        // Begin capture of learner assignment scores
        // Initialize learner score if not exists
        if (!learnerScores[learner_id]) {
            learnerScores[learner_id] = {
                id: learner_id,
                totalScore: 0,
                totalPossible: 0,
                assignmentScores: {},
            };
        }

        //Set scores, penalty, possible points
        learnerScores[learner_id].totalScore += score - penalty;
        learnerScores[learner_id].totalPossible += assignPoints;
        //Math.round to match example data given in SBA
        learnerScores[learner_id].assignmentScores[assignment_id] =
            Math.round(((score - penalty) / assignPoints) * 1000) / 1000;
    }

    // Generate final result array
    for (const learnerId in learnerScores) {
        const learner = learnerScores[learnerId];
        const avg = learner.totalScore / learner.totalPossible;

        // Initialize learner results
        const learnerResult = { id: learner.id, avg: avg };

        // Add assignment scores to the learner result
        for (const assignmentId in learner.assignmentScores) {
            learnerResult[assignmentId] =
                learner.assignmentScores[assignmentId];
        }

        result.push(learnerResult);
    }

    return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
