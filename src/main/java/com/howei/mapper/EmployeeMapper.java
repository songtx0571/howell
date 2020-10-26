package com.howei.mapper;

import com.howei.pojo.Employee;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
public interface EmployeeMapper {

    Employee getLoginEmployee(@Param("id") String employeeId);

    int homeUpdEmployee(Employee employee);
}
