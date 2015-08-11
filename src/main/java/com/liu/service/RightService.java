package com.liu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.liu.dao.RightMapper;
import com.liu.model.Right;

@Service(value="rightService")
public class RightService {

	@Autowired
	private  RightMapper dao;
	
	public List<Right> getMenu(String code){
		return dao.GetFirstLevelMenuByRoleCode(code);
	}
}
