package com.howei.service;

import com.howei.pojo.Employee;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface EmployeeService {
    Employee getLoginEmployee(String employeeId);

    int homeUpdEmployee(Employee employee);

    List<Employee> getEmployeeMap(Map map);

    List<Employee> getEmpListByDepartment(int id);

    //List<Employee> getEmployeeMap(Map map);
}
