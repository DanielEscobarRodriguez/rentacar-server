'use strict'

// NOTA: Estas funciones deben obtener los datos de la "BBDD" (data.js)
//  después debe filtrarlos para cumplir lo que se solicita

import { getAlumnos, addAlumno, getProfesores, addProfesor, getAsignaturas, addAsignatura } from './data.js'

function getAlumnoById(idAlumno) {
    return getAlumnos().find(alumno => alumno.id === idAlumno);
}

function getProfesorById(idProfesor) {
    return getProfesores().find(profesor => profesor.id === idProfesor);
}

function getAsignaturaById(idAsignatura) {
    return getAsignaturas().find(asignatura => asignatura.id === idAsignatura);
}

// Asignaturas que imparte un profesor
function getAsignaturasByProfesorId(idProfesor) {
    return getAsignaturas().filter(asignatura => asignatura.profesorId === idProfesor);
}

// Asignaturas en las que está matriculado un alumno
function getAsignaturasByAlumnoId(idAlumno) {
    return getAsignaturas().filter(asignatura => asignatura.alumnos.includes(idAlumno));
}

export default {
    alumnos: {
        get: {
            all: getAlumnos,
            byId: getAlumnoById
        },
        add: addAlumno
    },
    profesores: {
        get: {
            all: getProfesores,
            byId: getProfesorById
        },
        add: addProfesor
    },
    asignaturas: {
        get: {
            all: getAsignaturas,
            byId: getAsignaturaById,
            byProfesorid: getAsignaturasByProfesorId,
        },
        add: addAsignatura
    }
}