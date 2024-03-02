

export function calculateGradePoint(x,credit) {
    let grade, point;
    let allCredit=0
    let marks=parseInt(x)
    let gradePoint=0
    let tgpa
    if (marks >= 80) {
        grade='A+'
        point=4.0
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 75) {
        grade='A'
        point=3.75
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 70) {
        grade='A-'
        point=3.50
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 65) {
        grade='B+'
        point=3.25
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 60) {
        grade='B'
        point=3.0
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 55) {
        grade='B-'
        point=2.75
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 50) {
        grade='C+'
        point=2.50
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 45) {
        grade='C'
        point=2.25
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else if (marks >= 40) {
        grade='D'
        point=2.0
        allCredit+=parseFloat(credit)
        gradePoint+=parseFloat(point*credit)
    } else {
        grade='F'
        point=0.0
        allCredit+=0.0
        gradePoint+=parseFloat(point*credit)
    }


    tgpa=gradePoint/allCredit

    return { grade, point ,allCredit,tgpa};
   
}