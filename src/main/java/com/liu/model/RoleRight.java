package com.liu.model;

public class RoleRight {
    private Integer id;

    private String rolecode;

    private String rightcode;

    private String remark;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRolecode() {
        return rolecode;
    }

    public void setRolecode(String rolecode) {
        this.rolecode = rolecode == null ? null : rolecode.trim();
    }

    public String getRightcode() {
        return rightcode;
    }

    public void setRightcode(String rightcode) {
        this.rightcode = rightcode == null ? null : rightcode.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}