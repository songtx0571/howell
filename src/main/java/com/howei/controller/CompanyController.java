package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Company;
import com.howei.pojo.Users;
import com.howei.service.CompanyService;
import com.howei.util.DateFormat;
import com.howei.util.Type;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
@CrossOrigin(origins={"http://192.168.1.27:8080","http:localhost:8080"},allowCredentials = "true")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @RequestMapping("/getCompanyList")
    @ResponseBody
    public String getCompanyList(HttpServletRequest request){
        String parent=request.getParameter("parent");
        List<Company> list=companyService.getCompanyList(parent);
        if(list!=null&&list.size()>0){
            return JSON.toJSONString(list);
        }
        return JSON.toJSONString("0");
    }

    /**
     * 根据id查询Company
     * @param request
     * @return
     */
    @RequestMapping("/getCompany")
    @ResponseBody
    public String getCompany(HttpServletRequest request){
        String id=request.getParameter("id");
        if(id!=null){
            Company company=companyService.getCompanyById(id);
            if(company!=null){
                return JSON.toJSONString(company);
            }
        }
        return JSON.toJSONString("no");
    }

    /**
     * 修改
     * @param request
     * @return
     */
    @RequestMapping("/updateCompany")
    @ResponseBody
    public String updateCompany(HttpServletRequest request){
        String id=request.getParameter("id");
        String isactive=request.getParameter("isactive");
        String name=request.getParameter("name");
        String codeName=request.getParameter("codeName");
        if(id!=null){
            Company company=companyService.getCompanyById(id);
            if(company!=null){
                if(isactive!=null){
                    company.setIsactive(Integer.parseInt(isactive));
                }
                if(name!=null){
                    company.setName(name);
                }
                if(codeName!=null&&!codeName.equals("")){
                    company.setCodeName(codeName);
                }
                companyService.updateCompany(company);
                return JSON.toJSONString("success");
            }
            return JSON.toJSONString("no");
        }
        return JSON.toJSONString("error");
    }

    /**
     * 添加公司|部门
     * @param
     * @param request
     * @return
     */
    @RequestMapping("/addCompany")
    @ResponseBody
    public String addCompany(HttpServletRequest request){
        String parent=request.getParameter("parent");
        String name=request.getParameter("name");
        String type=request.getParameter("type");//0为公司，1为部门
        String codeName=request.getParameter("codeName");
        String headQuarters=request.getParameter("headQuarters");//0：本部
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        Integer employeeId=users.getEmployeeId();

        Company company=new Company();
        if(type!=null&&type.equals("1")){
            company.setParent(Integer.parseInt(parent));
            company.setHeadQuarters(1);
        }else{
            company.setParent(0);
            company.setHeadQuarters(Integer.parseInt(headQuarters));
            if(headQuarters.equals("0")){
                Company resultCompany=companyService.getCompany(company);
                //判断是否存在本部
                if(resultCompany!=null){
                    return JSON.toJSONString("haveHeadQuarters");
                }
            }
        }
        if(name!=null){
            company.setName(name);
        }
        if(employeeId!=null){
            company.setCreatedBy(employeeId);
        }
        if(codeName!=null&&!codeName.equals("")){
            company.setCodeName(codeName);
        }
        company.setIsactive(1);
        company.setCreated(DateFormat.getYMDHMS(new Date()));
        int count=companyService.addCompany(company);
        if(count>0){
            return JSON.toJSONString(Type.SUCCESS);
        }else{
            return JSON.toJSONString(Type.ERROR);
        }
    }
}
