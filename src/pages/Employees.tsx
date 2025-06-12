import React, { useState } from 'react';
import { Search, Users, Filter } from 'lucide-react';
import { employees } from '../data';
import EmployeeCard from '../components/EmployeeCard';

const Employees: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  
  // Get unique departments
  const departments = [...new Set(employees.map(e => e.department))];
  
  // Filter employees based on search term and department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === '' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Users className="mr-2 h-5 w-5 text-primary-700" />
          Employee Directory
        </h2>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, position, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input pl-10 pr-10 appearance-none"
            >
              <option value="">All Departments</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No employees found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;