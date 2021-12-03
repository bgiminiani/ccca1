import Enrollment from './Enrollment';
import EnrollmentRepository from './EnrollmentRepository';
import LevelRepository from './LevelRepository';
import ModuleRepository from './ModuleRepository';
import ClassroomRepository from './ClassroomRepository';
import Student from './Student';

export default class EnrollStudent {
  levelRepository: LevelRepository;
  moduleRepository: ModuleRepository;
  enrollmentRepository: EnrollmentRepository;
  classroomRepository: ClassroomRepository;

  constructor(levelRepository: LevelRepository, 
    moduleRepository: ModuleRepository,
    classroomRepository: ClassroomRepository,
    enrollmentRepository: EnrollmentRepository) {
    this.levelRepository = levelRepository;
    this.moduleRepository = moduleRepository;
    this.classroomRepository = classroomRepository;
    this.enrollmentRepository = enrollmentRepository;
  }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name, 
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate,
    );
    const level = this.levelRepository.find(enrollmentRequest.level);
    const module = this.moduleRepository.find(enrollmentRequest.level, enrollmentRequest.module);
    const classroom = this.classroomRepository.find(enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.classroom);
    const enrollmentDate = Date.now();
    const classroomEndDate = new Date(classroom.endDate).getTime();
    if (enrollmentDate > classroomEndDate) throw new Error('Class is already finished');
    const studentAge = student.getAge();
    if (studentAge < module.minimumAge) throw new Error('Should not enroll student below minimum age');
    const  existingStudentEnrollment = this.enrollmentRepository.findByCpf(student.cpf.value);
    if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const studentEnrolledInSchollRoom = this.enrollmentRepository.findAllByClassroom(level.code, module.code, classroom.code)
    const isOverRoomCapacity = studentEnrolledInSchollRoom.length >= classroom.capacity;
    if (isOverRoomCapacity) throw new Error('Should not enroll student over class capacity');
    const fullYear = new Date().getFullYear();
    const sequence = (this.enrollmentRepository.count() + 1).toString().padStart(4,'0');
    const code = `${fullYear}${level.code}${module.code}${classroom.code}${sequence}`;
    const enrollment = new Enrollment(
      student,
      code,
      level.code,
      module.code,
      classroom.code);
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}