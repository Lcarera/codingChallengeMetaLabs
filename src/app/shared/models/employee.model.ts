export class Employee {
    id: number;
    name: string;
    jobTitle: string;
    department: string;
    [key: string]: any;
  
    constructor(id: number, name: string, jobTitle: string, department: string) {
      this.id = id;
      this.name = name;
      this.jobTitle = jobTitle;
      this.department = department;
    }
  
    toString() {
      return `${this.name} (${this.jobTitle})`;
    }
}