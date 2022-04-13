package com.revature.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.revature.form.LoginForm;
import com.revature.models.Employee;
import com.revature.service.EmployeeService;

@Controller
public class LoginController {
	@Autowired
	private EmployeeService employeeService;
	
	//to get login form page
	@RequestMapping(value ="/login", method=RequestMethod.GET)
	public String getLoginForm() {
		//return html page name
		return "index";
	}
	//Checking for credentials
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(@ModelAttribute(name="loginForm") LoginForm loginForm, Model model, HttpSession session) {
		
		String username = loginForm.getUsername();
		System.out.println(username);
		String password = loginForm.getPassword();
		System.out.println(password);
		
		Employee emp = employeeService.findByUsername(username);
		System.out.println(emp.getUsername() + " Employee form database");
		
		System.out.println(emp.getUsername() + " " +  emp.getPassword() + " Employee form database not null");
		
		System.out.println(emp.getUsername() + emp.getPassword() + "Employee form database not null");
		if (emp.getUsername().equals(username) && emp.getPassword().equals(password)) {
			System.out.println("Employee form database matched");
			if (emp.getTitle().equals("Manager")) {
				long currentUser = emp.getId();
				model.addAttribute("id", currentUser);
				return "manager";
			}	
			else {
				long currentUser = emp.getId();
				model.addAttribute("id", currentUser);
				return "employee";
			}
			
			
			
			
		}
		
		//if username and pass is wrong
		model.addAttribute("invalidCredentials",true);
		//return login page
		return "index";
		
	}

	}
	
//	//to get login form page
//	@RequestMapping(value ="/login", method=RequestMethod.GET)
//	public String getLoginForm() {
//		//return html page name
//		return "index";
//	}
//	//Checking for credentials
//	@RequestMapping(value="/login", method=RequestMethod.POST)
//	public String login(@ModelAttribute(name="loginForm") LoginForm loginForm, Model model, HttpSession session) {
//		
//		String username = loginForm.getUsername();
//		System.out.println(username);
//		String password = loginForm.getPassword();
//		System.out.println(password);
//		
//		Employee emp = employeeService.findByUsername(username);
//		System.out.println(emp.getUsername() + "Employee form database");
//		
//		System.out.println(emp.getUsername() + emp.getPassword() + "Employee form database not null");
//		if (emp.getUsername().equals(username) && emp.getPassword().equals(password)) {
//			System.out.println("Employee form database matched");
//			if (emp.getTitle().equals("Manager")) {
//				return "redirect:/manager";
//			}	
//			else {
//				return "employee";
//			}
//				
//		} else {
//			model.addAttribute("invalidCredentials", true); <p th:if="${invalidCredentials}" class="error">Invalid Username And Password</p
//			return "index";
//		}
//		}
//	

