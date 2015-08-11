package com.liu.dao;

import java.util.List;

import com.liu.model.Right;

public interface RightMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Right record);

    int insertSelective(Right record);

    Right selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Right record);

    int updateByPrimaryKeyWithBLOBs(Right record);

    int updateByPrimaryKey(Right record);

	List<Right> GetFirstLevelMenuByRoleCode(String code);
}