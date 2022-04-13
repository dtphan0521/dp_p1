package com.revature.service;

import org.springframework.stereotype.Service;

import com.revature.models.Employee;
import com.revature.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	private EmployeeRepository employeeRepository; 
	
	public EmployeeService(EmployeeRepository employeeRepository) {	
		this.employeeRepository = employeeRepository;
	}
	
	public Employee findByUsername(String username) {
		return employeeRepository.findByUsername(username);
	}
	public Employee findByUsernameAndPassword(String usename, String password) {
		return employeeRepository.findByUsernameAndPassword(usename, password);
	};
	
}
