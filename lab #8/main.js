// Employee base class
class Employee {
    // Constructor to initialize employee properties
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    // Method to calculate the base salary considering the experience
    calculateBaseSalary() {
        if (this.experience > 5) {
            return this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            return this.baseSalary + 200;
        } else {
            return this.baseSalary;
        }
    }

    // Method to get the full name of the employee
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Method to get the final salary of the employee
    getSalary() {
        return this.calculateBaseSalary();
    }
}

// Developer class extending Employee
class Developer extends Employee {
    // Constructor for Developer which calls the base Employee constructor
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

// Designer class extending Employee
class Designer extends Employee {
    // Constructor for Designer with an additional efficiency coefficient parameter
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    // Method to get the final salary of the Designer considering the efficiency coefficient
    getSalary() {
        return super.getSalary() * this.effCoeff;
    }
}

// Manager class extending Employee
class Manager extends Employee {
    // Constructor for Manager with an additional team parameter (array of employees)
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    // Method to get the final salary of the Manager considering team size and composition
    getSalary() {
        let salary = super.getSalary();

        // Bonus based on team size
        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }

        // Additional bonus if more than half of the team are Developers
        const devCount = this.team.filter(member => member instanceof Developer).length;
        if (devCount > this.team.length / 2) {
            salary *= 1.1;
        }

        return salary;
    }
}

// Department class containing an array of managers
class Department {
    // Constructor for Department initializing with an array of managers
    constructor(managers = []) {
        this.managers = managers;
    }

    // Method to print the salary of all employees in the organization
    giveSalary() {
        this.managers.forEach(manager => {
            // Print the salary of the manager
            console.log(`${manager.getFullName()} отримав ${manager.getSalary()} шекєлей`);

            // Print the salary of each team member
            manager.team.forEach(member => {
                console.log(`${member.getFullName()} отримав ${member.getSalary()} шекєлей`);
            });
        });
    }
}

// Example usage:
// Creating Developer and Designer instances
const dev1 = new Developer("Алишев", "Олександр", 20000, 6);    // 20000 * 1.2 + 500 = 24500
const dev2 = new Developer("Базавлук", "Віталій", 14000, 3);    // 14000 + 200 = 14200
const dev3 = new Developer("Власюк", "Назарій", 14000, 1);      // 14000
const dev4 = new Developer("Гераськін", "Олександр", 14800, 4);      // 14800 + 200 = 15000
const des1 = new Designer("Дашевський", "Марк", 12000, 4, 0.9); // (12000 + 200) * 0.9 = 10980
const des2 = new Designer("Добровольський", "Данило", 9000, 1, 0.8);      // 9000 * 0.8 = 7200

// Creating a Manager instance with a team of Developers and Designers
const manager1 = new Manager("Дудко", "Ілля", 25000, 7, [dev1, dev2, dev3, dev4, des1, des2]); // ( (25000 * 1.2 + 500) + 200 ) * 1.1 = 33770


// Creating a Department instance with a list of managers
const department = new Department([manager1]);

// Printing the salaries of all employees in the department
department.giveSalary();