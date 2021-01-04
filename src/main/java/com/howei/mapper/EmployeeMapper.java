package com.howei.mapper;

import com.howei.pojo.Employee;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public interface EmployeeMapper {

    Employee getLoginEmployee(@Param("id") String employeeId);

    int homeUpdEmployee(Employee employee);

    List<Employee> getEmployeeMap(Map map);

    List<Employee> getEmpListByDepartment(@Param("id") int id);
}
