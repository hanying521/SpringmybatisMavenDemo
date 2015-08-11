package com.liu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liu.dao.userMapper;
import com.liu.model.User;

@Service(value="userService")
public class UserService {

	@Autowired
	private  userMapper dao;
	
	public User login(User user){
		return dao.getByName(user);
	}
}
