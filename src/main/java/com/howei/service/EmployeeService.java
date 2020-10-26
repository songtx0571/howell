package com.howei.service;

import com.howei.pojo.Employee;

public interface EmployeeService {
    Employee getLoginEmployee(String employeeId);

    int homeUpdEmployee(Employee employee);
}
