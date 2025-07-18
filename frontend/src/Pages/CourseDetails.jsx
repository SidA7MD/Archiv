import React from "react";
import { useParams } from "react-router-dom";

const courseContent = {
    francais: {
        title: "Français",
        content: "Bienvenue au cours de Français.",
    },
    anglais: {
        title: "Anglais",
        content: "Bienvenue au cours d'Anglais.",
    },
    algebra: {
        title: "Algèbre",
        content: "Cours d'introduction à l'algèbre.",
    },
    analyse: {
        title: "Analyse",
        content: "Cours sur l'analyse mathématique.",
    },
    "programmation-cpp": {
        title: "Programmation C++",
        content: "Apprenez à coder en C++.",
    },
    "base-de-donnees": {
        title: "Base de données",
        content: "Cours sur les systèmes de bases de données.",
    },
    "concepts-de-base-reseau": {
        title: "Concepts de base Réseau",
        content: "Introduction aux réseaux informatiques.",
    },
    "base-informatique": {
        title: "Base informatique",
        content: "Fondamentaux de l'informatique.",
    },
    "technologies-web": {
        title: "Technologies Web",
        content: "HTML, CSS, JavaScript, et plus.",
    },
};

export default function CourseDetails() {
    const { coursId } = useParams();
    const course = courseContent[coursId];

    if (!course) {
        return <h2 style={{ padding: "50px" }}>Cours introuvable.</h2>;
    }

    return (
        <main style={{ padding: "60px", fontFamily: "'Segoe UI', sans-serif" }}>
            <h1 style={{ fontSize: "2.5rem", color: "#2c3e50" }}>{course.title}</h1>
            <p style={{ fontSize: "1.1rem", marginTop: "20px" }}>{course.content}</p>
        </main>
    );
}
