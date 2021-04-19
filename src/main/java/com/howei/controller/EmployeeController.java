package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Employee;
import com.howei.pojo.Users;
import com.howei.service.EmployeeService;
import com.howei.util.Type;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    /**
     * 获取当前操作人的信息
     * @param request
     * @return
     */
    @RequestMapping("/getLoginEmployee")
    @ResponseBody
    public String getLoginEmployee(HttpServletRequest request){
        String employeeId=request.getParameter("employeeId");
        Employee employee=new Employee();
        if(employeeId!=null&&!employeeId.equals("")){
            employee=employeeService.getLoginEmployee(employeeId);
        }else{
            Subject sub=SecurityUtils.getSubject();

            Users users=(Users)sub.getPrincipal();
            if(users!=null){
                employeeId=String.valueOf(users.getEmployeeId());
                employee=employeeService.getLoginEmployee(employeeId);
            }
        }
        return JSON.toJSONString(employee);
    }

    /**
     * 首页修改用户信息
     * @param employee
     * @return
     */
    @RequestMapping("/homeUpdEmployee")
    @ResponseBody
    public String homeUpdEmployee(@RequestBody Employee employee){
        if(employee!=null&&employee.getId()!=null){
            int result=employeeService.homeUpdEmployee(employee);
            if(result>0){
                return JSON.toJSONString(Type.SUCCESS);
            }
        }
        return JSON.toJSONString(Type.CANCEL);
    }
}
