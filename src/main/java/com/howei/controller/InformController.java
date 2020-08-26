package com.howei.controller;

import com.alibaba.fastjson.JSON;
import com.howei.pojo.Company;
import com.howei.pojo.Inform;
import com.howei.pojo.InformType;
import com.howei.pojo.ReadStatus;
import com.howei.service.CompanyService;
import com.howei.service.InformService;
import com.howei.service.UserService;
import com.howei.util.DateFormat;
import com.howei.util.Page;
import com.howei.util.Result;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.*;
import java.util.*;

@Controller
@RequestMapping("/inform")
public class InformController {

    @Autowired
    InformService informService;

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
        String companyId=request.getParameter("companyId");
        String parent=request.getParameter("parent");
        Map map=new HashMap();
        map.put("companyId",companyId);
        map.put("parent",parent);
        List<InformType> list=informService.getInformType(map);
        return JSON.toJSONString(list);
    }

    /**
     * 获取通知类型列表
     * @param request
     * @return
     */
    @RequestMapping("/getInformTypeList")
    @ResponseBody
    public String getInformTypeList(HttpServletRequest request){
        init();
        String companyId=request.getParameter("companyId");
        String parent=request.getParameter("parent");
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);
        List<Object> result=new ArrayList<>();
        Map map=new HashMap();
        map.put("companyId",companyId);
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
        map.put("companyId",companyId);
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
        String companyId=request.getParameter("companyId");
        InformType informType=new InformType();
        if(name!=null){
            informType.setName(name);
        }
        if(parent!=null){
            informType.setParent(Integer.parseInt(parent));
        }else {
            informType.setParent(0);
        }
        if(companyId!=null){
            informType.setCompanyId(Integer.parseInt(companyId));
        }
        InformType result=informService.getInformTypeByParam(informType);
        if(result==null||result.getId()<=0){
            informType.setCreated(DateFormat.getYMDHMS(new Date()));
            informService.addInformType(informType);
            return JSON.toJSONString("添加成功");
        }
        return JSON.toJSONString("添加失败");
    }

    @RequestMapping("/updateInformType")
    @ResponseBody
    public String updateInformType(HttpServletRequest request) {
        String id=request.getParameter("id");
        String name=request.getParameter("name");
        String companyId=request.getParameter("companyId");
        String type=request.getParameter("type");//0:未修改  1:修改
        InformType informType=new InformType();
        if(name!=null){
            informType.setName(name);
        }
        if(type!=null&&type.equals("1")){
            if(companyId!=null){
                informType.setCompanyId(Integer.parseInt(companyId));
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
        String companyId=request.getParameter("companyId");
        String page=request.getParameter("page");
        String limit=request.getParameter("limit");
        int rows=Page.getOffSet(page,limit);
        Map map=new HashMap();
        map.put("companyId",companyId);
        List<Inform> total=informService.getInformList(map);
        map.put("pageSize",limit);
        map.put("page",rows);
        List<Inform> list=informService.getInformList(map);
        for (Inform inform:list){
            int company=inform.getCompanyId();
            int createdBy=inform.getCreatedBy();
            int informTypeId=inform.getInformTypeId();
            String companyName=(String)companyMap.get(company);
            inform.setCompanyName(companyName);
            String createdByName=usersMap.get(createdBy);
            inform.setCreatedByName(createdByName);
            String informTypeName=informTypeMap.get(informTypeId);
            inform.setInformTypeName(informTypeName);
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
     * @param session
     * @param file
     * @return
     */
    @RequestMapping(value="/addInform",method = RequestMethod.POST)
    @ResponseBody
    public String addInform(HttpSession session,HttpServletRequest request,@RequestParam("file") MultipartFile file) {
        String companyId=request.getParameter("companyId");
        String content=request.getParameter("content");
        String title=request.getParameter("title");
        String informTypeId=request.getParameter("informTypeId");
        Integer userId=(Integer) session.getAttribute("userId");
        String message = "";
        String filedir;
        Result result=new Result();
        result.setCode(0);

        Inform inform=new Inform();
        if(companyId!=null&&!companyId.equals("")){
            inform.setCompanyId(Integer.parseInt(companyId));
        }else{
            return JSON.toJSONString("请确认公司");
        }
        if(title!=null&&!title.equals("")){
            inform.setTitle(title);
        }
        try {
            if (file!=null) {
                message = file.getOriginalFilename();//现在的文件名是时间戳加原文件名
                String realPath = "D:/123/" + System.currentTimeMillis();//将文件保存在当前工程下的一个upload文件
                File dir = new File(realPath);
                FileUtils.copyInputStreamToFile(file.getInputStream(), new File(realPath, message));//将文件的输入流输出到一个新的文件
                filedir = realPath + "/" + message;
                inform.setFiledir(filedir);
            }
        } catch (Exception e) {
            result.setMsg("附件上传失败");
            return JSON.toJSONString(result);
        }
        if(content!=null&&!content.equals("")){
            inform.setContent(content);
        }
        if(informTypeId!=null){
            inform.setInformTypeId(Integer.parseInt(informTypeId));
        }
        inform.setCreatedBy(158);
        inform.setCreated(DateFormat.getYMDHMS(new Date()));
        informService.addInform(inform);
        result.setMsg("添加成功");
        return JSON.toJSONString(result);
    }

    /**
     * 修改通知
     * @param request
     * @return
     */
    @RequestMapping("/updateInform")
    @ResponseBody
    public String updateInform(HttpSession session,HttpServletRequest request) {
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
        Integer userId=(Integer)session.getAttribute("userId");
        ReadStatus readStatus=new ReadStatus();
        readStatus.setCreated(DateFormat.getYMDHMS(new Date()));
        readStatus.setInformId(Integer.parseInt(informId));
        readStatus.setRdStatus(1);
        readStatus.setUserId(158);
        informService.updateStatus(readStatus);
        Result result=new Result();
        result.setCode(0);
        result.setMsg("");
        return JSON.toJSONString(result);
    }
}
