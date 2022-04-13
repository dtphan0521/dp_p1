package com.revature.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Employee;



@Repository
public interface EmployeeRepository extends  CrudRepository<Employee, Long> , JpaRepository<Employee, Long>{

	Employee findByUsernameAndPassword(String usename, String password);
	
	Employee findByUsername(String username);

}
