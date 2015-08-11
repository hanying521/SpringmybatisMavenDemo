package com.liu.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.liu.model.User;
import com.liu.service.RightService;
import com.liu.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private RightService rightService;
	// 登录
	@RequestMapping("/login")
	public String Login(User user,HttpSession session,Model model){
		User reslult = userService.login(user);
		if(reslult == null){
			model.addAttribute("message","用户名或密码错误");
			return "login/login";
		}else{
			session.setAttribute("user", user);
			
			model.addAttribute("test", "test");
			
			return "AdminLayout/default";
		}
	} 
	
	
	@RequestMapping("/top")
	public String Top(Model model,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null ){
			return "login/login";
		}else{
		model.addAttribute("user",user);
		
		return "AdminLayout/top";
		}
	}
	@RequestMapping("/left")
	public String Left(Model model,HttpSession session){
		User user = (User)session.getAttribute("user");
		if(user == null ){
			return "login/login";
		}
		model.addAttribute("level1", rightService.getMenu(user.getRolecode()));
		return "AdminLayout/left";
	}
	@RequestMapping("/index")
	public String Index(Model model){
		model.addAttribute("msg", "欢迎来到优格玛管理系统");
		return "AdminLayout/index";
	}
	
	@RequestMapping("/exit")
	public String Exit(Model model,HttpSession session){
		model.addAttribute("message","");
		return "login/login";
	}
	
}
