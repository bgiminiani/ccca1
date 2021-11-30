import Enrollment from './Enrollment';
import EnrollmentRepository from './EnrollmentRepository';
import LevelRepository from './LevelRepository';
import ModuleRepository from './ModuleRepository';
import SchoolRoomRepository from './SchoolRoomRepository';
import Student from './Student';

export default class EnrollStudent {
  levelRepository: LevelRepository;
  moduleRepository: ModuleRepository;
  enrollmentRepository: EnrollmentRepository;
  schoolRoomRepository: SchoolRoomRepository;

  constructor(levelRepository: LevelRepository, 
    moduleRepository: ModuleRepository,
    schoolRoomRepository: SchoolRoomRepository,
    enrollmentRepository: EnrollmentRepository) {
    this.levelRepository = levelRepository;
    this.moduleRepository = moduleRepository;
    this.schoolRoomRepository = schoolRoomRepository;
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
    const schoolRoom = this.schoolRoomRepository.find(enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.schoolRoom);
    const enrollmentDate = Date.now();
    const schoolRoomEndDate = new Date(schoolRoom.endDate).getTime();
    if (enrollmentDate > schoolRoomEndDate) throw new Error('Class is already finished');
    const studentAge = student.getAge();
    if (studentAge < module.minimumAge) throw new Error('Should not enroll student below minimum age');
    const  existingStudentEnrollment = this.enrollmentRepository.findByCpf(student.cpf.value);
    if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const studentEnrolledInSchollRoom = this.enrollmentRepository.findAllBySchoolRomm(level.code, module.code, schoolRoom.code)
    const isOverRoomCapacity = studentEnrolledInSchollRoom.length >= schoolRoom.capacity;
    if (isOverRoomCapacity) throw new Error('Should not enroll student over class capacity');
    const fullYear = new Date().getFullYear();
    const sequence = (this.enrollmentRepository.count() + 1).toString().padStart(4,'0');
    const code = `${fullYear}${level.code}${module.code}${schoolRoom.code}${sequence}`;
    const enrollment = new Enrollment(
      student,
      code,
      level.code,
      module.code,
      schoolRoom.code);
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}