package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.*;
import com.howei.service.CompanyService;
import com.howei.service.EmployeeService;
import com.howei.service.GroupService;
import com.howei.service.UserService;
import com.howei.util.*;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 通讯管理
 */
@Controller
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    CompanyService companyService;

    public Users getPrincipal(){
        Subject subject=SecurityUtils.getSubject();
        Users users=(Users) subject.getPrincipal();
        return users;
    }

    /**-------------------------------------------------群组管理----------------------------------------------------*/
    /**
     * 获取群组列表
     * @return
     */
    @RequestMapping("/getGroupList")
    @ResponseBody
    public Result getGroupList(HttpServletRequest request){
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        String groupName=request.getParameter("groupName");
        int rows=Page.getOffSet(page,limit);
        Map map=new HashMap();
        if(groupName!=null&&!groupName.equals("")){
            map.put("groupName",groupName);
        }
        List<Group> total= groupService.getGroupList(map);
        map.put("pageSize",limit);
        map.put("page",rows);
        List<Group> list= groupService.getGroupList(map);
        Result result=new Result();
        result.setCode(0);
        result.setData(list);
        result.setCount(total.size());
        return result;
    }

    /**
     * 添加群组
     * @param group
     * @return
     */
    @RequestMapping(value = "/addGroup",method = RequestMethod.POST)
    @ResponseBody
    public String addGroup(@RequestBody Group group){
        String groupName=group.getGroupName();//群名称
        Users users=getPrincipal();
        //同名检测
        if(groupName!=null&&!groupName.equals("")){
            Group group1=groupService.findByGroupName(groupName);
            if(group1!=null){
                return JSON.toJSONString(Type.HAVE);
            }
            group.setCreated(DateFormat.getYMDHMS(new Date()));
            if(users!=null){
                group.setCreatedBy(users.getEmployeeId()+"");
            }
            int count=groupService.addGroup(group);
            EmployeeGroup employeeGroup=new EmployeeGroup();
            employeeGroup.setGroupId(group.getId());
            employeeGroup.setEmployeeId(users.getEmployeeId());
            employeeGroup.setCreated(DateFormat.getYMDHMS(new Date()));
            List<EmployeeGroup> list=new ArrayList<>();
            list.add(employeeGroup);
            groupService.addGroupUsers(list);
            if(count>=0){
                return JSON.toJSONString(Type.SUCCESS);
            }
        }
        return JSON.toJSONString(Type.CANCEL);
    }

    /**
     * 修改群组
     * @param group
     * @return
     */
    @RequestMapping(value = "/updGroup",method = RequestMethod.POST)
    @ResponseBody
    public String updGroup(@RequestBody Group group){
        String groupName=group.getGroupName();//群名称
        Integer id=group.getId();
        //同名检测
        if(groupName!=null&&!groupName.equals("")){
            Group group1=groupService.findByGroupNameAndId(groupName,id);
            if(group1!=null){
                return JSON.toJSONString(Type.HAVE);
            }
            int count=groupService.updGroup(group);
            if(count>=0){
                return JSON.toJSONString(Type.SUCCESS);
            }
        }
        return JSON.toJSONString(Type.CANCEL);
    }

    /**
     * 删除群组
     * @param request
     * @return
     */
    @RequestMapping("/delGroup")
    @ResponseBody
    public String delGroup(HttpServletRequest request){
        String id=request.getParameter("id");
        //删除群组内的成员
        try {
            if(id!=null){
                //int count=groupService.delGroupUsers(id);
            }
            //删除群组
            if(id!=null){
                groupService.delGroup(id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return JSON.toJSONString(Type.ERROR);
        }
        return JSON.toJSONString(Type.SUCCESS);
    }

    /**
     * 获取群成员列表
     * @param request
     * @return
     */
    @RequestMapping("/getGroupUsersList")
    @ResponseBody
    public Result getGroupUsersList(HttpServletRequest request){
        String groupId=request.getParameter("groupId");
        String userName=request.getParameter("userName");
        Result result=new Result();
        result.setCode(0);
        if(groupId!=null){
            Map map=new HashMap();
            map.put("groupId",groupId);
            if(userName!=null&&!userName.equals("")){
                map.put("userName",userName);
            }
            List<Employee> list=groupService.getGroupUsersList(map);
            if(list!=null){
                result.setData(list);
                result.setCount(list.size());
            }
            return result;
        }
        result.setData(null);
        result.setCount(0);
        result.setMsg("error");
        return result;
    }



    /**
     * 获取员工
     * @return
     */
    @RequestMapping("/getEmployeeMap")
    @ResponseBody
    public List<Map> getEmployeeMap(HttpServletRequest request){
        String companyId=request.getParameter("companyId");//部门id
        List<Map> result=new ArrayList<>();
        if(companyId!=null&&!companyId.equals("")){
            List<Employee> list=employeeService.getEmpListByDepartment(Integer.parseInt(companyId));
            if(list!=null){
                for (Employee employee:list) {
                    Map map=new HashMap();
                    map.put("name",employee.getName());
                    map.put("id",employee.getId());
                    result.add(map);
                }
            }
        }
        return result;
    }

    /**
     * 添加群成员
     * @param request
     * @return
     */
    @RequestMapping("/addGroupUsers")
    @ResponseBody
    public String addGroupUsers(HttpServletRequest request){
        String groupId=request.getParameter("groupId");
        String employeeIds=request.getParameter("employeeIds");
        List<EmployeeGroup> list=new ArrayList<>();
        if(employeeIds!=null){
            String[] arrId=employeeIds.split(",");
            for (String id:arrId) {
                EmployeeGroup employeeGroup=new EmployeeGroup();
                employeeGroup.setGroupId(Integer.parseInt(groupId));
                employeeGroup.setEmployeeId(Integer.parseInt(id));
                employeeGroup.setCreated(DateFormat.getYMDHMS(new Date()));
                list.add(employeeGroup);
            }
        }
        int count=groupService.addGroupUsers(list);
        if(count>=0){
            return JSON.toJSONString(Type.SUCCESS);
        }
        return  JSON.toJSONString(Type.ERROR);
    }

    /**
     * 删除群成员
     * @param request
     * @return
     */
    @RequestMapping("/delGroupUser")
    @ResponseBody
    public String delGroupUser(HttpServletRequest request){
        String groupId=request.getParameter("groupId");
        String employeeId=request.getParameter("employeeId");

        int count=groupService.delGroupUser(groupId,employeeId);
        if(count>=0){
            return JSON.toJSONString(Type.SUCCESS);
        }
        return  JSON.toJSONString(Type.ERROR);
    }

    /**-------------------------------------------------LayIM部门管理----------------------------------------------------*/

    /**
     * 获取公司/部门列表
     * @param request
     * @return
     */
    @RequestMapping("/getLayIMDepMap")
    @ResponseBody
    public List<Company> getLayIMDepMap(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        if(companyId!=null){
            List<Company> list=companyService.getCompanyList(companyId);
            return list;
        }
        return null;
    }

    /**
     * 根据公司获取展示状态的部门
     * @param request
     * @return
     */
    @RequestMapping("/getLayIMDepShowMap")
    @ResponseBody
    public List<Company> getLayIMDepShowMap(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        if(companyId!=null){
            List<Company> list=companyService.getLayIMDepShowMap(companyId);
            return list;
        }
        return null;
    }

    /**
     * 获取公司/部门列表
     * @param request
     * @return
     */
    @RequestMapping("/getLayIMDepList")
    @ResponseBody
    public Result getLayIMDepList(HttpServletRequest request){
        String companyId=request.getParameter("companyId");
        Result result=new Result();
        result.setCode(0);
        if(companyId!=null){
            List<Company> list=companyService.getCompanyList(companyId);
            result.setData(list);
            result.setCount(list.size());
        }
        return result;
    }

    @RequestMapping("/updLayIMDep")
    @ResponseBody
    public String updLayIMDep(HttpServletRequest request){
        String id=request.getParameter("id");
        String layIMState=request.getParameter("layIMState");
        if(id!=null&&!id.equals("")){
            Company company=companyService.getCompanyById(id);
            if(company!=null){
                company.setLayIMState(Integer.parseInt(layIMState));
                companyService.updateCompany(company);
                return JSON.toJSONString(Type.SUCCESS);
            }
        }
        return JSON.toJSONString(Type.ERROR);
    }

    /**-------------------------------------------------LayIM初始化----------------------------------------------------*/

    @RequestMapping("/LayIMInit")
    @ResponseBody
    private LayIMResult LayIMInit(){
        LayIMResult layIMResult=new LayIMResult();
        layIMResult.setCode(0);
        layIMResult.setMsg("");
        Map map=new HashMap();
        //初始化个人信息
        Users users=this.getPrincipal();
        if(users!=null){
            String id=users.getEmployeeId()+"";
            Employee employee=employeeService.getLoginEmployee(id);
            if(employee!=null){
                Mine mine=new Mine();
                mine.setAvatar("../../img/logo.png");
                mine.setId(employee.getId()+"");
                mine.setSign(employee.getSign());
                mine.setStatus("online");
                mine.setUsername(employee.getName());
                map.put("mine",mine);
            }
            //初始化朋友信息
            List<Map> friend=new ArrayList<>();
            List<Company> listCompany=companyService.getAllDepartmentList();
            for(Company company:listCompany){
                Map map1=new HashMap();
                map1.put("groupname",company.getName());
                map1.put("id",company.getId());
                List<Mine> listMap=new ArrayList<>();
                List<Employee> employeeList=employeeService.getEmpListByDepartment(company.getId());
                if(employeeList!=null){
                    for (Employee employee1:employeeList) {
                        Mine mine=new Mine();
                        mine.setUsername(employee1.getName());
                        mine.setSign(employee1.getSign());
                        mine.setId(employee1.getId()+"");
                        //查询当前登录对象的未读信息
                        Map map2=new HashMap();
                        map2.put("sendId",employee1.getId());
                        map2.put("sendToId",id);
                        List<ChatRecord> chatRecords=groupService.getUnReadList(map2);
                        if(chatRecords!=null){
                            mine.setRead(chatRecords.size());
                        }else{
                            mine.setRead(0);
                        }
                        //获取WebSocket.clients:用户在线列表
                        boolean bool=false;
                        Map<String, WebSocket> clients=WebSocket.getClients();
                        for (WebSocket item : clients.values()) {
                            if(item.getUserId().equals(employee1.getId()+"")){
                                bool=true;
                            }
                        }
                        if(bool){
                            mine.setStatus("online");
                        }else{
                            mine.setStatus("offline");
                        }
                        mine.setAvatar("../../img/logo.png");
                        listMap.add(mine);
                    }
                }
                map1.put("list",listMap);
                friend.add(map1);
            }
            map.put("friend",friend);
            //初始化群组信息
            List<Group> groupList2=groupService.getEmpInGroupList(id);
            List<Map> groupList1=new ArrayList<>();
            if(groupList2!=null) {
                for (Group group : groupList2) {
                    Map map1=new HashMap();
                    map1.put("groupname",group.getGroupName());
                    map1.put("id",group.getId());
                    map1.put("avatar","../../img/logo.png");
                    groupList1.add(map1);
                }
            }
            map.put("group",groupList1);
            layIMResult.setData(map);
        }
        return layIMResult;
    }

    /**
     * 加载群成员信息
     * @param request
     * @return
     */
    @RequestMapping("/GroupListInit")
    @ResponseBody
    public LayIMResult GroupListInit(HttpServletRequest request){
        String id=request.getParameter("id");
        LayIMResult layIMResult=new LayIMResult();
        layIMResult.setCode(0);
        layIMResult.setMsg("");
        //加载群主信息
        Group group=groupService.getCreatedByGroup(id);
        Map data=new HashMap();
        Map owner=new HashMap();
        String groupName="";//群名称
        if(group!=null){
            groupName=group.getGroupName();
            owner.put("username",group.getGroupName());
            owner.put("id",group.getEmployeeId());
            owner.put("avatar","../../img/logo.png");
            owner.put("sign",group.getSign());
        }
        data.put("owner",owner);
        //加载群成员信息
        List<Employee> listEmployee=groupService.getEmpListByGroup(groupName);
        List<Map> list=new ArrayList<>();
        if(listEmployee!=null&&listEmployee.size()>0){
            //群成员数
            data.put("members",listEmployee.size());
            //群成员
            for (Employee employee:listEmployee) {
                Map member =new HashMap();
                member.put("username",employee.getName());
                member.put("id",employee.getId());
                member.put("avatar","../../img/logo.png");
                member.put("sign",employee.getSign());
                list.add(member);
            }
        }
        data.put("list",list);
        layIMResult.setData(data);
        return layIMResult;
    }

    @RequestMapping("/getChatRecord")
    @ResponseBody
    public Map getChatRecord(HttpServletRequest request){
        String id=request.getParameter("id");
        String type=request.getParameter("type");
        Integer employeeId=null;
        Users user=this.getPrincipal();
        if(user!=null){
            employeeId=user.getEmployeeId();
        }
        List<Map> data=new ArrayList<>();
        if(id!=null&&type!=null){
            Map map=new HashMap();
            if(type.equals("friend")){
                map.put("type",type);
                map.put("sendId",employeeId);
                map.put("sendToId",id);
            }else if(type.equals("group")){
                map.put("type",type);
                map.put("sendToId",id);
            }
            map.put("limit",20);
            List<ChatRecord> list=groupService.getChatRecord(map);
            if(list!=null){
                for (ChatRecord chatRecord:list) {
                    Map<String,Object> cMap=new HashMap<>();
                    cMap.put("username",chatRecord.getUserName());
                    cMap.put("avatar","../../../../../img/logo.png");
                    cMap.put("timestamp",chatRecord.getLongTime());
                    cMap.put("content",chatRecord.getContent());
                    cMap.put("id",chatRecord.getSendId());
                    data.add(cMap);
                }
            }
        }
        Map result=new HashMap();
        result.put("code",0);
        result.put("msg","");
        result.put("data",data);
        return result;
    }

}
