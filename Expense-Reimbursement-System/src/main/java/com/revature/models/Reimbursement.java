package com.revature.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name = "reimbursements")
public class Reimbursement {
	private long id;
	private long employeeId;
	private String title;
	private double amountRequested;
	private Timestamp dateRequested;
	private String status;
	private String resolvedStatus;
	private long resolvedBy;
	private String picture;
	
	public Reimbursement() {
	}

	public Reimbursement(long employeeId, String title, double amountRequested, Timestamp dateRequested, String status,
			String resolvedStatus, long resolvedBy, String picture) {
		this.employeeId = employeeId;
		this.title = title;
		this.amountRequested = amountRequested;
		this.dateRequested = dateRequested;
		this.status = status;
		this.resolvedStatus = resolvedStatus;
		this.resolvedBy = resolvedBy;
		this.picture = picture;
	}

	public Reimbursement(long employeeId, String title, double amountRequested, Timestamp dateRequested, String status,
			String resolvedStatus, long resolvedBy) {
		this.employeeId = employeeId;
		this.title = title;
		this.amountRequested = amountRequested;
		this.dateRequested = dateRequested;
		this.status = status;
		this.resolvedStatus = resolvedStatus;
		this.resolvedBy = resolvedBy;
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name = "employee_id", nullable = false)
	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}
	
	@Column(name = "title", nullable = false)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	@Column(name = "amount_requested", nullable = false)
	public double getAmountRequested() {
		return amountRequested;
	}

	public void setAmountRequested(double amountRequested) {
		this.amountRequested = amountRequested;
	}
	@CreationTimestamp
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss", timezone="EST")
    @Column(name = "date_requested", nullable = false)
	public Timestamp getDateRequested() {
		return dateRequested;
	}

	public void setDateRequested(Timestamp dateRequested) {
		this.dateRequested = dateRequested;
	}

	@Column(name = "request_status")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "resolved_status")
	public String getResolvedStatus() {
		return resolvedStatus;
	}

	public void setResolvedStatus(String resolvedStatus) {
		this.resolvedStatus = resolvedStatus;
	}

	@Column(name = "resolved_by")
	public long getResolvedBy() {
		return resolvedBy;
	}

	public void setResolvedBy(long resolvedBy) {
		this.resolvedBy = resolvedBy;
	}

	@Column(name = "picture")
	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "Reimbursement [id=" + id + ", employeeId=" + employeeId + ", title=" + title + ", amountRequested="
				+ amountRequested + ", dateRequested=" + dateRequested + ", status=" + status + ", resolvedStatus="
				+ resolvedStatus + ", resolvedBy=" + resolvedBy + ", picture=" + picture + "]";
	}
	
	

}
