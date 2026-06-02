CREATE DATABASE IF NOT EXISTS student_management;
USE student_management;

CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  class_name VARCHAR(50) NOT NULL,
  section VARCHAR(10),
  capacity INT DEFAULT 30,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roll_number VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Other'),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  postal_code VARCHAR(10),
  class_id INT,
  admission_date DATE DEFAULT CURDATE(),
  status ENUM('Active', 'Inactive', 'Graduated') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_roll_number (roll_number),
  INDEX idx_status (status)
);

CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  credits INT DEFAULT 3,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_course_code (course_code)
);

INSERT INTO classes (class_name, section, capacity) VALUES
('Class A', 'A', 30),
('Class B', 'B', 30),
('Class C', 'C', 25);

INSERT INTO courses (course_code, course_name, credits, description) VALUES
('CS101', 'Introduction to Computer Science', 3, 'Basics of programming and CS'),
('CS201', 'Data Structures', 3, 'Study of data structures'),
('CS301', 'Algorithms', 3, 'Algorithm design and analysis');

INSERT INTO students (roll_number, first_name, last_name, email, phone, date_of_birth, gender, city, class_id, status) VALUES
('STU001', 'John', 'Doe', 'john.doe@example.com', '9876543210', '2005-03-15', 'Male', 'New York', 1, 'Active'),
('STU002', 'Jane', 'Smith', 'jane.smith@example.com', '9876543211', '2005-06-20', 'Female', 'Los Angeles', 1, 'Active'),
('STU003', 'Michael', 'Johnson', 'michael.j@example.com', '9876543212', '2005-09-10', 'Male', 'Chicago', 2, 'Active');
