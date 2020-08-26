package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Company;
import com.howei.service.CompanyService;
import com.howei.util.DateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller
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
     * @param session
     * @param request
     * @return
     */
    @RequestMapping("/addCompany")
    @ResponseBody
    public String addCompany(HttpSession session,HttpServletRequest request){
        String parent=request.getParameter("parent");
        String name=request.getParameter("name");
        String type=request.getParameter("type");//0为公司，1为部门
        Integer userId=(Integer) session.getAttribute("userId");
        String codeName=request.getParameter("codeName");
        Company company=new Company();
        if(name!=null){
            company.setName(name);
        }
        if(userId!=null){
            company.setCreatedBy(12);
        }
        if(codeName!=null&&!codeName.equals("")){
            company.setCodeName(codeName);
        }
        if(type!=null&&!type.equals("")&&type.equals("1")){
            company.setParent(Integer.parseInt(parent));
        }else{
            company.setParent(0);
        }
        company.setIsactive(1);
        company.setCreated(DateFormat.getYMDHMS(new Date()));
        int count=companyService.addCompany(company);
        if(count>0){
            return JSON.toJSONString("success");
        }else{
            return JSON.toJSONString("error");
        }
    }
}
