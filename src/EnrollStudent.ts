import Enrollment from './Enrollment';
import EnrollmentRepository from './EnrollmentRepository';
import LevelRepository from './LevelRepository';
import ModuleRepository from './ModuleRepository';
import ClassroomRepository from './ClassroomRepository';
import Student from './Student';
import Level from './Level';
import RepositoryAbstractFactory from './RepositoryAbstractFactory';

export default class EnrollStudent {
  levelRepository: LevelRepository;
  moduleRepository: ModuleRepository;
  enrollmentRepository: EnrollmentRepository;
  classroomRepository: ClassroomRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.levelRepository = repositoryFactory.createLevelRepository();
    this.moduleRepository = repositoryFactory.createModuleRepository();
    this.classroomRepository = repositoryFactory.createClassroomRepository();
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name, 
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate,
    );
    const level = new Level({code: enrollmentRequest.level, description: enrollmentRequest.description});
    const module = this.moduleRepository.find(level.getCode(), enrollmentRequest.module);
    const classroom = this.classroomRepository.find(enrollmentRequest.level, enrollmentRequest.module, enrollmentRequest.classroom);

    const enrollmentDate = Date.now();
    const classroomEndDate = new Date(classroom.endDate).getTime();
    if (enrollmentDate > classroomEndDate) throw new Error('Class is already finished');

    const existingStudentEnrollment = this.enrollmentRepository.findByCpf(student.cpf.value);
    if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');

    const studentEnrolledInSchollRoom = this.enrollmentRepository.findAllByClassroom(level.getCode(), module.code, classroom.code)
    const isOverRoomCapacity = studentEnrolledInSchollRoom.length >= classroom.capacity;
    if (isOverRoomCapacity) throw new Error('Should not enroll student over class capacity');

    const issueDate = new Date();
    const enrollmentSequence = this.enrollmentRepository.count() + 1;
    const enrollment = new Enrollment(
      student,
      level,
      module,
      classroom,
      issueDate,
      enrollmentSequence,
      enrollmentRequest.installments);
   
    enrollment.generateInvoice()
    this.enrollmentRepository.save(enrollment);
    return enrollment;
  }
}