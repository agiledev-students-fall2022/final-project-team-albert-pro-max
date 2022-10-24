import './Schedule.css'
import { useState, useEffect } from 'react'

const Schedule = ({show}) => {
    const [courseBlock, setCourseBlock] = useState("")

    useEffect(() => {
        if (show) setCourseBlock("Agile")
        else setCourseBlock("")
    }, [show])

    return (
        <>
            <h2>Schedule</h2>
            <>{courseBlock}</>
        </>
    )
}

export default Schedule