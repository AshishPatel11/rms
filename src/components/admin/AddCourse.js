import React from 'react'

function AddCourse() {
    return (
        <>
            <h2>Create Course</h2>
            <form method="post">
                <label for='courseName'>Course Name:-</label>
                <input type="text" name='courseName' id='courseName' required placeholder='Name of Course' />


                <label for='courseYear'>Course Year:-</label>
                <input type="text" name='courseYear' id='courseYear' required placeholder='Year duration of Course' />


                <label for='Semester'>Total Semester:-</label>
                <input type="number" name='Semester' id='Semester' required placeholder='No. of semester' />

                <input type='submit' name='submit' />
            </form>
        </>
    )
}
export default AddCourse