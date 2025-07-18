import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
    const { coursId } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/courses/${coursId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Cours introuvable.");
                }
                return res.json();
            })
            .then((data) => setCourse(data))
            .catch((err) => setError(err.message));
    }, [coursId]);

    if (error) {
        return <h2 style={{ padding: "50px" }}>{error}</h2>;
    }

    if (!course) {
        return <h2 style={{ padding: "50px" }}>Chargement...</h2>;
    }

    return (
        <main style={{ padding: "60px", fontFamily: "'Segoe UI', sans-serif" }}>
            <h1 style={{ fontSize: "2.5rem", color: "#2c3e50" }}>{course.title}</h1>
            <p style={{ fontSize: "1.2rem", marginTop: "20px" }}>{course.description}</p>
            <div style={{ marginTop: "30px", fontSize: "1.1rem" }}>
                {course.content}
            </div>
        </main>
    );
}
