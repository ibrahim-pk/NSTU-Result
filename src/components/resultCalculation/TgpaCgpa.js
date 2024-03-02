// Function to calculate TGPA
function calculateTGPA(grades, credits) {
   
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {
        totalPoints += grades[i] * credits[i];
        totalCredits += credits[i];
    }

    const tgpa = totalPoints / totalCredits;
    return tgpa.toFixed(2); // Round to 2 decimal places
}

// Function to calculate CGPA
function calculateCGPA(tgpas) {
    let totalTGPA = 0;

    for (let i = 0; i < tgpas.length; i++) {
        totalTGPA += parseFloat(tgpas[i]);
    }

    const cgpa = totalTGPA / tgpas.length;
    return cgpa.toFixed(2); // Round to 2 decimal places
}

// Example usage
const grades = [3.5, 4.0, 3.7]; // Grades for each term
const credits = [3, 4, 3]; // Credits for each term
const tgpas = [calculateTGPA(grades, credits)]; // Calculate TGPA for each term
const cgpa = calculateCGPA(tgpas); // Calculate CGPA

console.log("TGPA for each term:", tgpas);
console.log("CGPA:", cgpa);
