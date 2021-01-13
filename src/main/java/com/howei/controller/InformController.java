package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.*;
import com.howei.service.CompanyService;
import com.howei.service.InformService;
import com.howei.service.UserInformService;
import com.howei.service.UserService;
import com.howei.util.DateFormat;
import com.howei.util.Page;
import com.howei.util.Result;
import com.howei.util.Type;
import org.apache.commons.io.FileUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
import java.io.*;
import java.net.*;
import java.util.*;

import static org.apache.shiro.authz.annotation.Logical.OR;

@Controller
@RequestMapping("/inform")
@CrossOrigin(origins={"http://192.168.1.27:8080","http:localhost:8080"},allowCredentials = "true")
public class InformController {

    @Autowired
    InformService informService;

    @Autowired
    UserInformService userInformService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserService userService;

    private Map<Integer,Object> companyMap;
    private Map<Integer,String> usersMap;
    private Map<Integer,String> informTypeMap;

    void init(){
        companyMap=companyService.getCompanyMap("0");
        usersMap=userService.getUsersMap();
        informTypeMap=informService.getInformTypeMap();
    }

    public Users getSecuityUtils(){
        Subject subject=SecurityUtils.getSubject();
        Users user=(Users) subject.getPrincipal();
        return user;
    }

    /**
     * 获取公司|部门列表
     * @param request
     * @return
     */
    @RequestMapping("/getCompanyList")
    @ResponseBody
    public String getCompanyList(HttpServletRequest request){
        String parent=request.getParameter("parent");
        List<Company> list=companyService.getCompanyList(parent);
        return JSON.toJSONString(list);
    }

    @RequestMapping("/getUsersList")
    @ResponseBody
    public String getUsersList(HttpServletRequest request){
        String parent=request.getParameter("parent");
        String departmentId=request.getParameter("departmentId");
        List<Map<String,String>> result=new ArrayList<>();
        Map map=new HashMap();
        if(parent!=null){
            map.put("companyId",parent);
        }
        if(departmentId!=null&&!departmentId.equals("0")){
            map.put("departmentId",departmentId);
        }
        result=userService.getUsersList(map);
        Result result1=new Result();
        result1.setCount(1000);
        result1.setCode(0);
        result1.setMsg("");
        result1.setData(result);
        return JSON.toJSONString(result1);
    }

    @RequestMapping("/getDepartmentList")
    @ResponseBody
    public String getDepartmentList(HttpServletRequest request){
        String companyId=request.getParameter("parent");
        List<Map<String,String>> result=new ArrayList<>();
        if(companyId!=null){
            result=companyService.getDepartmentList(companyId);
        }
        return JSON.toJSONString(result);
    }

    /**
     * 查询通知类型列表
     * @param request
     * @return
     */
    @RequestMapping("/getInformTypes")
    @ResponseBody
    public String getInformTypes(HttpServletRequest request){
        Users users=this.getSecuityUtils();
        String parent=request.getParameter("parent");
        Map map=new HashMap();
        map.put("companyId",users.getCompanyId());
        map.put("parent",parent);
        List<InformType> list=informService.getInformType(map);
        return JSON.toJSONString(list);
    }

    /**
     * 获取通知类型列表
     * @param request
     * @return
     */
    @RequiresPermissions(value = {"通知类型"},logical = OR)
    @RequestMapping("/getInformTypeList")
    @ResponseBody
    public String getInformTypeList(HttpServletRequest request){
        init();
        String parent=request.getParameter("parent");
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);

        Users users=this.getSecuityUtils();

        List<Object> result=new ArrayList<>();
        Map map=new HashMap();
        map.put("companyId",users.getCompanyId());
        map.put("parent",0);
        List<InformType> total=informService.getInformType(map);
        //查询为0的通知类型
        for(int i=0;i<total.size();i++){
            InformType inform=total.get(i);
            String company=(String)companyMap.get(inform.getCompanyId());
            inform.setCompanyName(company);
            result.add(inform);
            int id=inform.getId();
            map.put("parent",id);
            List<InformType> list=informService.getInformType(map);
            if(list!=null){
                for(int k=0;k<list.size();k++){
                    InformType informK=list.get(k);
                    String companyName=(String)companyMap.get(informK.getCompanyId());
                    informK.setCompanyName(companyName);
                    result.add(informK);
                }
            }
        }
        map.clear();
        map.put("companyId",users.getCompanyId());
        List<InformType> list=informService.getInformType(map);
        Result res=new Result();
        res.setMsg("");
        res.setCode(0);
        res.setData(result);
        if(list!=null){
            res.setCount(list.size());
        }
        return JSON.toJSONString(res);
    }

    /**
     * 根据id查询
     * @param request
     * @return
     */
    @RequestMapping("/getInformType")
    @ResponseBody
    public String getInformType(HttpServletRequest request){
        String id=request.getParameter("id");
        InformType informType=informService.getInformTypeById(id);
        return JSON.toJSONString(informType);
    }

    /**
     * 添加通知类型
     * @param request
     * @return
     */
    @RequestMapping("/addInformType")
    @ResponseBody
    public String addInformType(HttpServletRequest request) {
        String name=request.getParameter("name");
        String parent=request.getParameter("parent");
        Users users=this.getSecuityUtils();
        InformType informType=new InformType();
        if(name!=null){
            informType.setName(name);
        }
        if(parent!=null){
            informType.setParent(Integer.parseInt(parent));
        }else {
            informType.setParent(0);
        }
        if(users!=null){
            informType.setCompanyId(users.getCompanyId());
        }
        InformType result=informService.getInformTypeByParam(informType);
        if(result==null||result.getId()<=0){
            informType.setCreated(DateFormat.getYMDHMS(new Date()));
            informService.addInformType(informType);
            return JSON.toJSONString("添加成功");
        }
        return JSON.toJSONString(Type.CANCEL);
    }

    @RequestMapping("/updateInformType")
    @ResponseBody
    public String updateInformType(HttpServletRequest request) {
        String id=request.getParameter("id");
        String name=request.getParameter("name");
        String type=request.getParameter("type");//0:未修改  1:修改
        Users users=this.getSecuityUtils();
        InformType informType=new InformType();
        if(name!=null){
            informType.setName(name);
        }
        if(type!=null&&type.equals("1")){
            if(users!=null){
                informType.setCompanyId(users.getCompanyId());
            }
            InformType result=informService.getInformTypeByParam(informType);
            if(result!=null){
                return JSON.toJSONString("系统中已存在");
            }else{
                informType.setId(Integer.parseInt(id));
                informService.updateInformType(informType);
                return JSON.toJSONString("修改成功");
            }
        }else if(type!=null&&type.equals("0")){
            informType=informService.getInformTypeById(id);
            if(informType!=null){
                informType.setId(Integer.parseInt(id));
                informService.updateInformType(informType);
                return JSON.toJSONString("修改成功");
            }else{
                return JSON.toJSONString("系统中不存在此类型");
            }
        }
        return JSON.toJSONString("修改失败");
    }

    /**
     * 获取通知列表
     * @param request
     * @return
     */
    @RequestMapping("/getInformList")
    @ResponseBody
    public String getInformList(HttpServletRequest request){
        init();
        String isactive=request.getParameter("isactive");//1:创建人；2:收件人
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        Users users=this.getSecuityUtils();

        Integer companyId=null;
        Integer userId=null;

        int rows=Page.getOffSet(page,limit);
        Map map=new HashMap();
        if(users!=null){
            companyId=users.getCompanyId();
            userId=users.getId();
            map.put("userId",userId);
        }
        if(isactive!=null&&!isactive.equals("")){
            map.put("isactive",isactive);
        }else{
            map.put("isactive",3);
        }
        map.put("companyId",companyId);
        List<Inform> total=informService.getInformList(map);
        map.put("pageSize",limit);
        map.put("page",rows);
        List<Inform> list=informService.getInformList(map);
        for (Inform inform:list){
            if(inform!=null){
                int company=inform.getCompanyId();
                int informTypeId=inform.getInformTypeId();
                String companyName=(String)companyMap.get(company);
                inform.setCompanyName(companyName);
                String informTypeName=informTypeMap.get(informTypeId);
                inform.setInformTypeName(informTypeName);
            }
        }
        Result res=new Result();
        res.setMsg("");
        res.setCode(0);
        res.setData(list);
        if(list!=null){
            res.setCount(total.size());
        }
        return JSON.toJSONString(res);
    }

    /**
     * 添加通知
     * @param
     * @param
     * @return
     */
    @RequestMapping(value="/addInform")
    @ResponseBody
    public String addInform(HttpServletRequest request) {
        String content=request.getParameter("content");
        String title=request.getParameter("title");
        String informTypeId=request.getParameter("informTypeId");
        String filedir=request.getParameter("filedir");
        String usersId=request.getParameter("usersId");//接受人列表

        Integer userId=null;
        Integer companyId=null;

        Users users=getSecuityUtils();
        if(users!=null){
            userId=users.getId();
            companyId=users.getCompanyId();
        }

        Inform inform=new Inform();
        if(companyId!=null&&!companyId.equals("")){
            inform.setCompanyId(companyId);
        }else{
            return JSON.toJSONString(Type.CANCEL);
        }
        if(filedir!=null&&!filedir.equals("")){
            inform.setFiledir(filedir);
        }
        if(title!=null&&!title.equals("")){
            inform.setTitle(title);
        }
        if(content!=null&&!content.equals("")){
            inform.setContent(content);
        }
        if(informTypeId!=null){
            inform.setInformTypeId(Integer.parseInt(informTypeId));
        }
        if(userId!=null){
            inform.setCreatedBy(userId);
        }
        inform.setCreated(DateFormat.getYMDHMS(new Date()));
        int infromId=informService.addInform(inform);
        Integer informId=inform.getId();
        //保存接收人
        if(usersId!=null){
            String[] userIdStr=usersId.split(",");
            for (String str:userIdStr){
                UserInform userInform=new UserInform();
                userInform.setInformId(informId);
                userInform.setUserId(Integer.parseInt(str));
                userInform.setRdStatus(0);
                userInform.setCreated(DateFormat.getYMDHMS(new Date()));
                userInformService.addUserInform(userInform);
            }
        }
        return JSON.toJSONString(Type.SUCCESS);
    }

    @RequestMapping(value = "/uploadFeiles",method = RequestMethod.POST)
    @ResponseBody
    public String uploadFeiles(@RequestParam("file") MultipartFile file){
        String message = "";
        String filedir;
        Result result=new Result();
        try {
            if (file!=null) {
                message = file.getOriginalFilename();//现在的文件名是时间戳加原文件名
                String realPath = "D:/123/" + System.currentTimeMillis();//将文件保存在当前工程下的一个upload文件
                FileUtils.copyInputStreamToFile(file.getInputStream(), new File(realPath, message));//将文件的输入流输出到一个新的文件
                filedir = realPath + "/" + message;
                List list=new ArrayList();
                list.add(filedir);
                result.setCode(0);
                result.setData(list);
                result.setMsg("success");
                return JSON.toJSONString(result);
            }
        } catch (Exception e) {
            result.setCode(-1);
            result.setMsg("error");
            return JSON.toJSONString(result);
        }
        result.setCode(-1);
        result.setMsg("error");
        return JSON.toJSONString(result);
    }

    /**
     * 修改通知
     * @param request
     * @return
     */
    @RequestMapping("/updateInform")
    @ResponseBody
    public String updateInform(HttpServletRequest request) {
        String id=request.getParameter("id");
        String content=request.getParameter("content");
        String title=request.getParameter("title");
        Result res=new Result();
        res.setCode(0);

        Inform inform=informService.getInformById(id);
        if(inform!=null){
            if(title!=null&&!title.equals("")){
                inform.setTitle(title);
            }
            if(content!=null&&!content.equals("")){
                inform.setContent(content);
            }
            int result=informService.updateInform(inform);
            if(result!=-1){
                res.setMsg("添加成功");
            }else{
                res.setMsg("添加失败");
            }
        }else{
            res.setMsg("系统中不存在此通知");
        }
        return JSON.toJSONString(res);
    }

    /**
     * 通知附件下载
     * @param request
     * @param response
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping("/downloadFile")
    public void download(HttpServletRequest request, HttpServletResponse response,HttpSession session) throws IOException {
        Integer userId=(Integer) session.getAttribute("userId");
        String id=request.getParameter("id");
        Inform inf = informService.getInformById(id);
        String path = inf.getFiledir();
        String fileNames[] = path.split("/");
        String fileName = (fileNames[fileNames.length - 1]);
        //要改成Linux下的绝对路径
        URL url = new URL("file://" + path);//设置下载本地文件的时候需要加file:// 否则报错
        URLConnection uc = url.openConnection();
        response.setContentType("application/octet-stream");//设置文件类型
        response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
        response.setHeader("Content-Length", String.valueOf(uc.getContentLength()));
        //设置不会打开文件
        OutputStream outp = response.getOutputStream();
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(path));
        byte[] b = new byte[1024];
        int i = 0;
        while ((i = in.read(b)) > 0) {
            outp.write(b, 0, i);
        }
        outp.flush();
        in.close();
        outp.close();
    }

    /**
     * 查寻已查看通知人员清单
     * @return
     */
    @RequestMapping("/selSeen")
    @ResponseBody
    public String selSeen(HttpServletRequest request){
        String informId=request.getParameter("informId");
        List<String> list=new ArrayList<>();
        if(informId!=null){
            List<Map> map=userService.selSeen(informId);
            for (Map map1:map){
                Integer userId=(Integer)map1.get("userId");
                String userName=userService.selSeenUser(userId+"");
                if(userName==null||userName.equals("")){

                }else {
                    list.add(userName);
                }
            }
        }
        Result result=new Result();
        result.setCode(0);
        result.setMsg("");
        result.setData(list);
        return JSON.toJSONString(result);
    }

    /**
     * 添加查看人员查看通知记录
     * @param request
     * @param session
     * @return
     */
    @RequestMapping("/updateStatus")
    @ResponseBody
    public String updateStatus(HttpServletRequest request,HttpSession session){
        String informId=request.getParameter("informId");
        Users users=this.getSecuityUtils();
        UserInform userInform=new UserInform();
        if(users!=null){
            userInform.setUserId(users.getId());
        }
        if(informId!=null&&!informId.trim().equals("")){
            userInform.setInformId(Integer.parseInt(informId));
        }
        userInform.setRdDateTime(DateFormat.getYMDHMS(new Date()));
        userInform.setRdStatus(1);
        informService.updateStatus(userInform);
        Result result=new Result();
        result.setCode(0);
        result.setMsg("");
        return JSON.toJSONString(result);
    }
}
