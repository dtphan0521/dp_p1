package com.revature.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.exceptions.ResourceNotFoundException;
import com.revature.models.Reimbursement;
import com.revature.repository.ReimbursementRepository;

@RestController
@RequestMapping("/api")
public class ReimbursementController {
	@Autowired
	private ReimbursementRepository reimbursementRepository;
	
//	@Autowired
//	private EmployeeRepository employeeRepository;

	
	@GetMapping("/reimbursements")
	public List<Reimbursement> getReimbursements() {
		return reimbursementRepository.findAll();
	}
	
	//need work on it
	@GetMapping("/reimbursements/{id}")
	public ResponseEntity<Reimbursement> getReimbursementByEmpId(@PathVariable(value = "employee_id") Long employeeId)throws ResourceNotFoundException {
		Reimbursement reimbursement = reimbursementRepository.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Reimbursement not found for this Employee :: " + employeeId));
		return ResponseEntity.ok().body(reimbursement);
		
	}
	
	@PostMapping("/reimbursements")
	public Reimbursement createReimbursement(@Valid @RequestBody Reimbursement reimbursement) {
		return reimbursementRepository.save(reimbursement);	
	}
	//need work
	@PutMapping("/reimbursements/{id}")
	public ResponseEntity<Reimbursement> updateReimbursement(@PathVariable(value = "id") Long reimbursementId,
			@Valid @RequestBody Reimbursement reimbursementDetails) throws ResourceNotFoundException {
		Reimbursement reimbursement = reimbursementRepository.findById(reimbursementId)
				.orElseThrow(() -> new ResourceNotFoundException("Reimbursement not found for this id :: " + reimbursementId));

		reimbursement.setStatus(reimbursementDetails.getStatus());
		reimbursement.setResolvedStatus(reimbursementDetails.getResolvedStatus());
		reimbursement.setResolvedBy(reimbursementDetails.getResolvedBy());
		
		final Reimbursement updatedReimbursement = reimbursementRepository.save(reimbursement);
		return ResponseEntity.ok(updatedReimbursement);
	}
	
	@DeleteMapping("/reimbursements/{id}")
	public Map<String, Boolean> deleteReimbursements(@PathVariable(value = "id") Long id)
			throws ResourceNotFoundException {
		Reimbursement reimbursement = reimbursementRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Reimbursement deleted  :: " + id));

		reimbursementRepository.delete(reimbursement);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	

}
