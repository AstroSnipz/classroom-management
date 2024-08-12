CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,  -- New column for user name
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('principal', 'teacher', 'student')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classrooms (
    classroom_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    days_in_session VARCHAR(50) NOT NULL,
    teacher_id INT UNIQUE REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students_classrooms (
    student_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    classroom_id INT REFERENCES classrooms(classroom_id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, classroom_id)
);

CREATE TABLE timetables (
    timetable_id SERIAL PRIMARY KEY,
    classroom_id INT REFERENCES classrooms(classroom_id) ON DELETE CASCADE,
    subject_name VARCHAR(100) NOT NULL,
    period_start_time TIME NOT NULL,
    period_end_time TIME NOT NULL,
    day_of_week VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT no_overlapping_periods CHECK (
        period_start_time < period_end_time
    )
);


CREATE TABLE teacher_student (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    student_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

