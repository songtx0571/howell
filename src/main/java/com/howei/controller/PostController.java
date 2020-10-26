package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Company;
import com.howei.pojo.Post;
import com.howei.pojo.Users;
import com.howei.service.CompanyService;
import com.howei.service.PostService;
import com.howei.util.DateFormat;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
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

import static org.apache.shiro.authz.annotation.Logical.OR;

@Controller
@RequestMapping("/post")
@CrossOrigin(origins={"http://192.168.1.27:8080","http:localhost:8080"},allowCredentials = "true")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private CompanyService companyService;

    /**
     * 查询岗位列表
     * @param request
     * @return
     */
    @RequiresPermissions(value = {"岗位查看"},logical = OR)
    @RequestMapping("/getPostList")
    @ResponseBody
    public String getPostList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        List<Post> list=postService.getPostList(companyId);
        return JSON.toJSONString(list);
    }

    /**
     * 查询公司列表
     * @param request
     * @return
     */
    @RequestMapping("/getCompanyList")
    @ResponseBody
    public String getCompanyList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        List<Company> list=companyService.getCompanyList("0");
        return JSON.toJSONString(list);
    }

    @RequestMapping("/getPost")
    @ResponseBody
    public String getPost(HttpServletRequest request){
        String id=request.getParameter("id");
        Post post=new Post();
        if(id!=null&&!id.equals("")){
            post.setId(Integer.parseInt(id));
        }
        Post result=postService.getPost(post);
        return JSON.toJSONString(result);
    }

    /**
     * 修改岗位
     * @param request
     * @return
     */
    @RequiresPermissions(value = {"更新岗位信息"},logical = OR)
    @RequestMapping("/updatePost")
    @ResponseBody
    public String updatePost(HttpServletRequest request){
        String id=request.getParameter("id");
        String companyId=request.getParameter("companyId");
        String name=request.getParameter("name");
        String remark=request.getParameter("remark");
        String identification=request.getParameter("identification");
        Post post=new Post();
        if(companyId!=null&&!companyId.equals("")){
            post.setCompanyId(Integer.parseInt(companyId));
        }
        if(name!=null&&!name.equals("")){
            post.setName(name);
        }
        if(identification.equals("true")){
            Post po=postService.getPost(post);
            if(po==null||po.getId()==0){
                post.setId(Integer.parseInt(id));
                post.setRemark(remark);
                postService.updatePost(post);
                return JSON.toJSONString("修改成功");
            }else{
                return JSON.toJSONString("公司已存在此岗位");
            }
        }else {
            post.setId(Integer.parseInt(id));
            post.setRemark(remark);
            postService.updatePost(post);
            return JSON.toJSONString("修改成功");
        }
    }

    /**
     * 添加岗位
     * @param request
     * @return
     */
    @RequiresPermissions(value = {"添加岗位"},logical = OR)
    @RequestMapping("/addPost")
    @ResponseBody
    public String addPost(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        String name=request.getParameter("name");
        String remark=request.getParameter("remark");
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        Integer employeeId=users.getEmployeeId();
        Post post=new Post();
        if(companyId!=null&&!companyId.equals("")){
            post.setCompanyId(Integer.parseInt(companyId));
        }
        if(name!=null&&!name.equals("")){
            post.setName(name);
        }
        if(employeeId!=null){
            post.setCreatedBy(employeeId);
        }
        Post po=postService.getPost(post);
        if(po==null||po.getId()==0){
            post.setCreated(DateFormat.getYMDHMS(new Date()));
            post.setCreatedBy(12);
            post.setIsactive(1);
            post.setRemark(remark);
            postService.addPost(post);
            return JSON.toJSONString("添加成功");
        }else{
            return JSON.toJSONString("公司已存在此岗位");
        }
    }
}
