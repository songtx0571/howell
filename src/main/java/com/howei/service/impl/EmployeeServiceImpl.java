package com.howei.service.impl;

import com.howei.mapper.EmployeeMapper;
import com.howei.pojo.Employee;
import com.howei.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    @Override
    public Employee getLoginEmployee(String employeeId) {
        return employeeMapper.getLoginEmployee(employeeId);
    }

    @Override
    public int homeUpdEmployee(Employee employee) {
        return employeeMapper.homeUpdEmployee(employee);
    }

    @Override
    public List<Employee> getEmployeeMap(Map hashMap) {
        return employeeMapper.getEmployeeMap(hashMap);
    }

    @Override
    public List<Employee> getEmpListByDepartment(int id) {
        return employeeMapper.getEmpListByDepartment(id);
    }
}
