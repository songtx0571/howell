package com.howei.controller;

import cn.hutool.http.HttpUtil;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.howei.config.redis.MyRedisManager;
import com.howei.pojo.*;
import com.howei.realm.LoginRealm;
import com.howei.service.*;
import com.howei.util.DateFormat;
import com.howei.util.MD5;
import com.howei.util.Result;
import org.apache.catalina.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSON;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import static org.apache.shiro.authz.annotation.Logical.OR;

@Controller
@CrossOrigin(origins = {"http://192.168.1.27:8080", "http:localhost:8080", "http://192.168.1.27:8848"}, allowCredentials = "true")
public class HomeController {

    @Autowired
    MenuService menuService;

    @Autowired
    UserService userService;
    @Autowired
    IndexDataService indexDataService;
    @Autowired
    CompanyService companyService;

    @Value("${weatherAPI.url}")
    private String url;
    @Value("${weatherAPI.version}")
    private String version;
    @Value("${weatherAPI.appid}")
    private String appid;
    @Value("${weatherAPI.appsecret}")
    private String appsecret;


    // 左菜单
    @RequestMapping("/leftMenu")
    public String toLeftMenu() {
        return "leftMenu";
    }

    @RequestMapping("/index")
    public String toIndex() {
        return "index";
    }

    @RequestMapping("/log")
    @ResponseBody
    public String log() {
        return "您没有权限访问";
    }

    // 信息
    @RequestMapping("/homePopup")
    public String toHomePopup() {
        return "homePopup";
    }

    // 角色管理
    @RequiresPermissions(value = {"角色管理"}, logical = OR)
    @RequestMapping("/roleManagement")
    public String toRoleManagement() {
        return "roleManagement";
    }

    // 部门管理
    @RequiresPermissions(value = {"部门管理"}, logical = OR)
    @RequestMapping("/departmentManagement")
    public String toDepartmentManagement() {
        return "departmentManagement";
    }

    // 账户管理
    @RequestMapping("/accountManagement")
    public String toAccountManagement() {
        return "accountManagement";
    }

    // 岗位管理
    @RequiresPermissions(value = {"岗位管理"}, logical = OR)
    @RequestMapping("/postManagement")
    public String toPostManagement() {
        return "postManagement";
    }

    // 通知管理
    @RequiresPermissions(value = {"通知管理"}, logical = OR)
    @RequestMapping("/noticeManagement")
    public String toNoticeManagement() {
        return "noticeManagement";
    }

    // 权限管理
    @RequestMapping("/authorityManagement")
    public String toAuthorityManagement() {
        return "authorityManagement";
    }

    // 通讯管理
    @RequestMapping("/messageManagement")
    public String toMessageManagement() {
        return "messageManagement";
    }

    // 群组管理
    @RequestMapping("/groupManagement")
    public String toGroupManagement() {
        return "groupManagement";
    }

    // LayIM部门管理
    @RequestMapping("/LayIMManagement")
    public String toLayIMManagement() {
        return "LayIMManagement";
    }

    // 版本管理
    @RequestMapping("/versionManagement")
    public String toVersionManagement() {
        return "versionManagement";
    }

    // 菜单管理
    @RequestMapping("/menuManagement")
    public String toMenuManagement() {
        return "menuManagement";
    }

    /**
     * @return 动态区域管理
     */
    @GetMapping("/dynamicRegion")
    public String toOperationPaget() {
        return "dynamicRegion";
    }

    @RequestMapping("/")
    public String index(HttpSession session) {
        if (session.getAttribute("userId") != null) {
            return "home";
        }
        return "login";
    }

    @RequestMapping("/login")
    public String login(HttpSession session) {
        if (session.getAttribute("userId") != null) {
            return "home";
        }
        return "login";
    }

    /**
     * 系统登出
     *
     * @return
     */
    @RequestMapping("/logout")
    public String logOut(HttpServletResponse response) {
        Subject subject = SecurityUtils.getSubject();
        PrincipalCollection principalCollection = (PrincipalCollection) subject.getPrincipal();
        response.setStatus(302);
        if (subject.isAuthenticated()) {
            subject.logout();
            return "login";
        }
        LoginRealm loginRealm = new LoginRealm();
        loginRealm.clearCache(principalCollection);
        loginRealm.clearCachedAuthenticationInfo(principalCollection);
        loginRealm.clearCachedAuthorizationInfo(principalCollection);
        subject.logout();
        return "login";
    }

    /**
     * 登录页面
     *
     * @return
     */
    @GetMapping(value = "/loginPage")
    public ModelAndView loginPage() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    /**
     * 登录
     *
     * @param request
     * @return
     */
    @PostMapping(value = "/loginPage")
    public ModelAndView loginadmin(HttpServletRequest request) {
        String username = request.getParameter("userNumber").toUpperCase();
        String password = request.getParameter("password");
        MD5 md5 = new MD5();
        try {
            password = md5.EncoderByMd5(password);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        //储存用户名与密码
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        Subject subject = SecurityUtils.getSubject();
        ModelAndView mode = new ModelAndView();
        try {
            subject.login(token);
        } catch (Exception e) {
            e.printStackTrace();
            if ("no_user".equals(e.getMessage())) {
                mode.setViewName("login");
                mode.addObject("no_user", "账号不存在");
                return mode;
            } else if ("no_permission".equals(e.getMessage())) {
                mode.setViewName("login");
                mode.addObject("no_permission", "密码错误");
                return mode;
            } else if ("no_status".equals(e.getMessage())) {
                mode.addObject("no_status", "账号已过期");

                mode.setViewName("login");
                return mode;
            }
        }
        Users user = userService.loginUserNumber(username, password);
        //token
        Serializable id = subject.getSession().getId();
        //将token放入redis
        MyRedisManager manager = MyRedisManager.getRedisSingleton();
        manager.setHost("localhost");
        manager.setPort(6379);
        manager.setTimeout(1800);
        manager.setPassword("12345");
        manager.init();
        manager.set(id.toString(), user.getId().toString(), 60 * 30);//半小时
        //防止同一个账号同时登录
        manager.set(user.getId().toString(), id.toString(), 60 * 30);
        //用户信息
        manager.set(user.getId().toString(), JSONObject.toJSONString(user), 60 * 30);
        long timeout = SecurityUtils.getSubject().getSession().getTimeout();
        System.out.println("设置前:" + timeout + "毫秒");
        //SecurityUtils.getSubject().getSession().setTimeout(10000);
        timeout = SecurityUtils.getSubject().getSession().getTimeout();
        System.out.println("设置后:" + timeout + "毫秒");
        mode.setViewName("home");
        return mode;
    }

    @RequestMapping("/getMenuTree")
    @ResponseBody
    public String getMenuTree(HttpServletRequest request) {
        String rootMenuId = request.getParameter("rootMenuId");
        Subject subject = SecurityUtils.getSubject();
        Map map = new HashMap();
        if (rootMenuId != null && rootMenuId.equals("25")) {//WA项目
            map.put("template", "2");
        } else if (rootMenuId != null && rootMenuId.equals("23")) {//Guide项目
            map.put("template", "1");
        } else if (rootMenuId != null && rootMenuId.equals("24")) {//AI项目
            map.put("template", "3");
        } else if (rootMenuId != null && rootMenuId.equals("26")) {//Exam项目
            map.put("template", "5");
        } else if (rootMenuId != null && rootMenuId.equals("27")) {//defect项目
            map.put("template", "6");
        } else if (rootMenuId != null && rootMenuId.equals("27")) {//Exam项目
            map.put("template", "6");
        }
        map.put("parent", 0);
        List<Menu> rootMenuList = menuService.getMenuTree(map);
        Iterator<Menu> iterator = rootMenuList.iterator();
        while (iterator.hasNext()) {
            Menu menu = iterator.next();
            if (!subject.isPermitted(menu.getName())) {
                iterator.remove();
            }
        }

        List<Menu> resultList = new ArrayList<>();
        for (Menu menu : rootMenuList) {
            Integer id = menu.getId();
            map.put("parent", id);
            List<Menu> menuList = menuService.getMenuTree(map);
            if (menuList != null && menuList.size() > 0) {
                iterator = menuList.iterator();
                while (iterator.hasNext()) {
                    Menu menu1 = iterator.next();
                    if (!subject.isPermitted(menu1.getName())) {
                        iterator.remove();
                    }
                }
                menu.setChildren(getMenuTree(id, menuList));
                resultList.add(menu);
            }
        }
       /* for (Menu menu : rootMenuList) {
            Integer id = menu.getId();
            map.put("parent", id);
            List<Menu> menuList = menuService.getMenuTree(map);
            if (menuList != null && menuList.size() > 0) {
                iterator = menuList.iterator();
                while (iterator.hasNext()) {
                    Menu menu1 = iterator.next();
                    if (!subject.isPermitted(menu1.getName())) {
                        iterator.remove();
                    }
                }
                MenuTree menuTree = new MenuTree();
                menuTree.setId(String.valueOf(menu.getId()));
                menuTree.setText(menu.getName());
                menuTree.setpId(String.valueOf(menu.getParent()));
                menuTree.setUrl(menu.getUrl());
                menuTree.setChildren(getMenuTree(id, menuList));
                resultList.add(menuTree);
            }
        }*/
        String json = JSON.toJSONString(resultList);
        return json;
    }

    /**
     * 获取菜单列表
     *
     * @return
     */
    public List<Menu> getMenuTree(Integer id, List<Menu> menuList) {
        List<Menu> list = new ArrayList<>();
        for (Menu menu : menuList) {
            if (menu.getParent() == id) {
                list.add(menu);
            }
        }
        return list;
    }

    @RequestMapping(value = "/getLoginInf")
    @ResponseBody
    public String getLoginInf() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Integer userId = users.getId();
        return JSON.toJSONString(userId);
    }

    @RequestMapping(value = "/getUserInfo")
    @ResponseBody
    public String getUserInfo() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Integer employeeId = users.getEmployeeId();
        return JSON.toJSONString(employeeId);
    }

    /**
     * 获取当前登录人信息
     *
     * @return
     */
    @RequestMapping("/getLoginUserInfo")
    @ResponseBody
    public Map getLoginUserInfo() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        Map<String, Object> map = new HashMap<>();
        if (users != null) {
            map.put("id", users.getEmployeeId());
            map.put("userName", users.getUserName());
            map.put("userNumber", users.getUserNumber());
            map.put("departmentId", users.getDepartmentId());
        }
        return map;
    }

    /**
     * 首页数据 图标展示
     *
     * @return
     */
    @GetMapping("/getIndexData")
    @ResponseBody
    public Result getIndexData() throws InterruptedException {
        List<Map<String, Object>> resultMapList = new ArrayList<>();

        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            return new Result(0, null, 0, "用户失效");
        }
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        String formatDate = sdf.format(date);


        List<Integer> departmentIdList = new ArrayList<>();
        if (subject.isPermitted("查询所有部门首页数据")) {
            departmentIdList.addAll(Arrays.asList(new Integer[]{17, 18, 19, 20}));
        } else {
            int departmentId = users.getDepartmentId();
            boolean contains = Arrays.asList(new Integer[]{17, 18, 19, 20}).contains(departmentId);
            if (contains) {
                departmentIdList.add(departmentId);
            }
        }
        //一池五线程
        ExecutorService threadPool = Executors.newFixedThreadPool(5);///5个窗口
        CountDownLatch countDownLatch = new CountDownLatch(departmentIdList.size());
        if (departmentIdList.size() > 0) {
            try {
                for (Integer departmentId : departmentIdList) {
                    threadPool.execute(() -> {
                        Map<String, Object> paramMap = new HashMap<>();
                        paramMap.put("date", formatDate + "%");
                        Map<String, Object> jxEmoloyeeNameMapMap = new HashMap<>();
                        List<Map<String, Object>> yxEmployeeNameList = new ArrayList<>();
                        Map<String, Object> resultMap = new HashMap<>();
                        paramMap.put("departmentId", departmentId);
                        //天气的城市码和城市名称
                        Map<String, Object> cityCodeAndName = getCityCodeAndNameByDepartmentId(departmentId);
                        resultMap.putAll(cityCodeAndName);
                        Map<String, Object> map = new HashMap<>();

                        map.put("version", version);
                        map.put("appid", appid);
                        map.put("appsecret", appsecret);
                        map.put("cityid", cityCodeAndName.get("cityCode"));
                        //天气信息
                        String weatherStr = HttpUtil.get(url, map);
                        JSONObject weatherJson = JSON.parseObject(weatherStr);
                        resultMap.put("weatherData", weatherJson);
                        //部门名称
                        Company company = companyService.getCompanyById(departmentId.toString());
                        resultMap.put("departmentId", departmentId);
                        resultMap.put("departmentName", company.getName());
                        //解析数据,返回统计数据,并且在参数中计算检修人员名单
                        List<Map<String, Object>> staticsList = this.parseJXRecoreListByDepartmentId(paramMap, jxEmoloyeeNameMapMap, yxEmployeeNameList);
                        Collection<Object> jxData = jxEmoloyeeNameMapMap.values();
                        resultMap.put("departmentJXData", jxData);
                        resultMap.put("departmentYXData", yxEmployeeNameList);
                        resultMap.put("staticsData", staticsList);
                        resultMapList.add(resultMap);
                        countDownLatch.countDown();
                    });
                }

            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                threadPool.shutdown();
            }
        }
        countDownLatch.await();
        return new Result(resultMapList.size(), resultMapList, 200, "查询成功");
    }


    /**
     * 解析不同的部门的首页元数据
     *
     * @param paramMap
     * @param jxEmoloyeeNameMapMap
     * @return
     */
    public List<Map<String, Object>> parseJXRecoreListByDepartmentId(Map<String, Object> paramMap, Map<String, Object> jxEmoloyeeNameMapMap, List<Map<String, Object>> yxEmploeeNameList) {
        List<Map<String, Object>> mapListMapList = new ArrayList<>();

        Map<String, Object> mapListMap;

        Date date = new Date();
        Date thisDayBegin = DateFormat.getThisDayTimeBegin(date, -1, 17);
        Date nextDayBegin = DateFormat.getThisDayTimeBegin(date, 0, 17);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        //当月维护数据
        List<MaintainRecord> maintainRecordListThisMonth = indexDataService.getMaintainRecordByMap(paramMap);
        //当天维护数据
        List<MaintainRecord> maintainRecordListThisDay = maintainRecordListThisMonth.stream().filter(item ->
                item.getClaimTime() != null && item.getClaimTime().compareTo(sdf.format(thisDayBegin)) > 0 && item.getClaimTime().compareTo(sdf.format(nextDayBegin)) < 0
        ).collect(Collectors.toList());
        //解析当天检修人员名单 维护部分,将结果保存在jxEmoloyeeNameMapMap中
        this.parseJXRecordList(maintainRecordListThisDay, jxEmoloyeeNameMapMap);

        //当天维护数据 按状态分组
        Map<String, List<MaintainRecord>> maintainRecordListThisDayGroupByStatus = maintainRecordListThisDay.stream().collect(Collectors.groupingBy(MaintainRecord::getStatus));

        //已完成数量 统计列表中状态是2的记录
        int countFinishedMaintainRecord = maintainRecordListThisDayGroupByStatus.get("2") != null ? maintainRecordListThisDayGroupByStatus.get("2").size() : 0;
        //完成数量 统计列表中状态不是2的记录
        int countUnfinishedMaintainRecord = maintainRecordListThisDay.size() - (maintainRecordListThisDayGroupByStatus.get("2") != null ? maintainRecordListThisDayGroupByStatus.get("2").size() : 0);
        //当月缺陷数
        List<Defect> defectListThisMonth = indexDataService.getDefectByMap(paramMap);
        //当月缺陷数 按类型分
        Map<Integer, List<Defect>> defectListThisMonthGroupByType = defectListThisMonth.stream().collect(Collectors.groupingBy(Defect::getType));
        //当月缺陷统计数据
        mapListMap = this.parseDefectStaticsData(defectListThisMonthGroupByType, "当月缺陷统计");
        //添加到返回集合中
        mapListMapList.add(mapListMap);

        //当天缺陷数
        List<Defect> defectListThisDay = defectListThisMonth.stream().filter(
                item -> item.getCreated().compareTo(sdf.format(thisDayBegin)) > 0 && item.getCreated().compareTo(sdf.format(nextDayBegin)) < 0
        ).collect(Collectors.toList());

        //解析当天检修人员名单 缺陷部分,将结果保存在jxEmoloyeeNameMapMap中
        this.parseJXRecordList(defectListThisDay, jxEmoloyeeNameMapMap);
        //当天缺陷 按类型分
        Map<Integer, List<Defect>> defectListThisDayGroupByType = defectListThisDay.stream().collect(Collectors.groupingBy(Defect::getType));
        //当天缺陷统计数据
        mapListMap = this.parseDefectStaticsData(defectListThisDayGroupByType, "当天缺陷统计");
        //添加到返回集合中
        mapListMapList.add(mapListMap);

        int countFinishedDefect = defectListThisDayGroupByType.get(4) != null ? defectListThisDayGroupByType.get(4).size() : 0;
        int countUnfinishedDefect = defectListThisDay.size() - (defectListThisDayGroupByType.get(4) != null ? defectListThisDayGroupByType.get(4).size() : 0);

        //当天缺陷任务完成率
        mapListMap = this.parseFinishRate(countFinishedMaintainRecord, countUnfinishedMaintainRecord, countFinishedDefect, countUnfinishedDefect, "当天检修任务完成率");
        //添加到返回集合中
        mapListMapList.add(mapListMap);

        /* <- 运行人员名单  */
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        paramMap.put("date", sdf1.format(date) + "%");
        //当天8点
        Date thisDayBegin8 = DateFormat.getThisDayTimeBegin(date, 0, 8);
        //当天16点
        Date thisDayBegin16 = DateFormat.getThisDayTimeBegin(date, 0, 16);
        Integer type = null; //白班 中班,夜班
        String endTime = "";
        String startTime;
        /**
         *  0<date<8 type =3
         *  8<date<16 type =1
         *  16<date<24 type =2
         */
        if (thisDayBegin.getTime() < date.getTime() && date.getTime() < thisDayBegin8.getTime()) {
            type = 3;
            startTime = sdf.format(thisDayBegin);
            endTime = sdf.format(thisDayBegin8);
        } else if (thisDayBegin8.getTime() < date.getTime() && date.getTime() < thisDayBegin16.getTime()) {
            type = 1;
            startTime = sdf.format(thisDayBegin8);
            endTime = sdf.format(thisDayBegin16);
        } else {
            type = 2;
            startTime = sdf.format(thisDayBegin16);
            endTime = sdf.format(nextDayBegin);
        }

        //当天运行记录
        List<ScrDaily> scrDailyList = indexDataService.getScrDailyByMap(paramMap);
        Integer finalType = type;
        //当班运行记录
        List<ScrDaily> thisTimeScrDailyList = scrDailyList.stream().filter(item -> item.getType() == finalType).collect(Collectors.toList());

        paramMap.put("startTime", sdf.format(thisDayBegin));
        paramMap.put("endTime", sdf.format(nextDayBegin));
        //当天运行数据记录
        List<Map<String, Object>> thisDayYxStsticMapList = indexDataService.getPostPeratorDataMapByMap(paramMap);
        //检修次数
        int countThisDayFrequency = thisDayYxStsticMapList.stream().mapToInt(item -> Integer.valueOf(String.valueOf(item.get("frequency")))).sum();
        //检修点数
        int countThisDayPoint = thisDayYxStsticMapList.stream().mapToInt(item -> Integer.valueOf(String.valueOf(item.get("point")))).sum();
        //解析数据
        mapListMap = this.parseYxStatic(countThisDayFrequency, countThisDayPoint, "当天巡检统计");
        //添加到结果集合中
        mapListMapList.add(mapListMap);
        paramMap.put("startTime", startTime);
        paramMap.put("endTime", endTime);
        //当班运行数据记录
        List<Map<String, Object>> thisShiftYxStsticMapList = indexDataService.getPostPeratorDataMapByMap(paramMap);


        if (thisTimeScrDailyList != null && thisTimeScrDailyList.size() > 0) {
            for (ScrDaily scrDaily : thisTimeScrDailyList) {
                //接班人编号
                String successor = scrDaily.getSuccessor();
                String[] successors = null;
                if (!StringUtils.isEmpty(successor)) {
                    successors = successor.split(";");
                }
                if (successors != null) {
                    //将运行人员编号转化为名称添加到运行人员列表中
                    for (String userNumber : successors) {
                        Users userByEmployeeId = userService.getUserByUserNumber(userNumber);
                        Object frequency = "0";
                        if (userByEmployeeId != null) {
                            Map<String, Object> map = new HashMap<>();
                            List<Map<String, Object>> thisEmployeeYxStaticMapList = thisShiftYxStsticMapList.stream().filter(item -> item.get("userNumber").equals(userByEmployeeId.getUserNumber())).collect(Collectors.toList());
                            if (thisEmployeeYxStaticMapList.size() > 0) {
                                frequency = thisEmployeeYxStaticMapList.get(0).get("frequency");
                            }
                            map.put("name", userByEmployeeId.getUserName());
                            map.put("taskNum", frequency);
                            yxEmploeeNameList.add(map);
                        }
                    }
                }
            }
        }


        //检修次数
        int countThisShiftFrequency = thisShiftYxStsticMapList.stream().mapToInt(item -> Integer.valueOf(String.valueOf(item.get("frequency")))).sum();
        //检修点数
        int countThisShiftPoint = thisShiftYxStsticMapList.stream().mapToInt(item -> Integer.valueOf(String.valueOf(item.get("point")))).sum();
        //解析数据
        mapListMap = this.parseYxStatic(countThisShiftFrequency, countThisShiftPoint, "当班巡检统计");
        //添加到结果集合中
        mapListMapList.add(mapListMap);
        return mapListMapList;
    }

    /**
     * 检修统计图
     *
     * @param countFrequency 检修次数
     * @param countPoint     检修点数
     * @param name
     * @return
     */
    private Map<String, Object> parseYxStatic(int countFrequency, int countPoint, String name) {
        Map<String, Object> mapListMap = new HashMap<>();
        List<Map<String, Object>> mapList = new ArrayList<>();
        Map<String, Object> map;
        if (countFrequency > 0) {
            map = new HashMap<>();
            map.put("name", "巡检次数");
            map.put("value", countFrequency);
            mapList.add(map);
        }
        if (countPoint > 0) {
            map = new HashMap<>();
            map.put("name", "巡检点数");
            map.put("value", countPoint);
            mapList.add(map);
        }
        mapListMap.put("name", name);
        mapListMap.put("data", mapList);
        return mapListMap;
    }

    /**
     * 当前检修任务完成率
     */
    private Map<String, Object> parseFinishRate(int countFinishedM, int countUnfinishedM, int countFinishedD, int countUnfinishedD, String name) {
        Map<String, Object> resultMap = new HashMap<>();
        List<Map<String, Object>> mapListList = new ArrayList<>();
        //添加缺陷
        Map<String, Object> mapListMap = new HashMap<>();
        List<Map<String, Object>> mapList = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        map.put("name", "已完成");
        map.put("value", countFinishedM);
        mapList.add(map);
        map = new HashMap<>();
        map.put("name", "未完成");
        map.put("value", countUnfinishedM);
        mapList.add(map);
        mapListMap.put("name", "维护");
        mapListMap.put("data", mapList);
        mapListList.add(mapListMap);
        //添加缺陷
        mapListMap = new HashMap<>();
        mapList = new ArrayList<>();
        map = new HashMap<>();
        map.put("name", "已完成");
        map.put("value", countFinishedD);
        mapList.add(map);
        map = new HashMap<>();
        map.put("name", "未完成");
        map.put("value", countUnfinishedD);
        mapList.add(map);
        mapListMap.put("name", "缺陷");
        mapListMap.put("data", mapList);
        mapListList.add(mapListMap);

        resultMap.put("data", mapListList);
        resultMap.put("name", name);
        return resultMap;
    }


    /**
     * 解析数据返回统计图格式所需数据
     *
     * @param defectListGroupByType
     * @param name
     * @return
     */
    public Map<String, Object> parseDefectStaticsData(Map<Integer, List<Defect>> defectListGroupByType, String name) {

        Map<String, Object> mapListMap = new HashMap<>();
        List<Map<String, Object>> mapList = new ArrayList<>();
        //得到Key的集合
        Set<Integer> defectListThisMonthGroupByTypeKeySet = defectListGroupByType.keySet();
        //循环Key
        for (Integer defectListGroupByTypeKey : defectListThisMonthGroupByTypeKeySet) {
            Map<String, Object> map = new HashMap<>();
            //得到该Key的缺陷数据
            List<Defect> defectListByTypeId = defectListGroupByType.get(defectListGroupByTypeKey);
            //添加每一类的大小
            map.put("value", defectListByTypeId.size());
            //添加颜色和名称
            map.putAll(this.getDefectKVByType(defectListGroupByTypeKey));
            mapList.add(map);
        }
        mapListMap.put("name", name);
        mapListMap.put("data", mapList);
        return mapListMap;
    }

    /**
     * 添加每一类的名称和颜色
     *
     * @param type
     * @return
     */
    public Map<String, Object> getDefectKVByType(Integer type) {
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> map = new HashMap<>();
        if (type == 1) {
            resultMap.put("name", "未认领");
            map.put("color", "red");
            resultMap.put("itemStyle", map);
        } else if (type == 5) {
            resultMap.put("name", "已认领");
            map.put("color", "#dcb422");
            resultMap.put("itemStyle", map);
        } else if (type == 2) {
            resultMap.put("name", "消缺中");
            map.put("color", "#ff8100");
            resultMap.put("itemStyle", map);
        } else if (type == 3) {
            resultMap.put("name", "已消缺");
            map.put("color", "#8fc323");
            resultMap.put("itemStyle", map);
        } else if (type == 4) {
            resultMap.put("name", "已完成");
            map.put("color", "green");
            resultMap.put("itemStyle", map);
        } else if (type == 6) {
            resultMap.put("name", "延期中");
            map.put("color", "#001580");
            resultMap.put("itemStyle", map);
        } else {
            resultMap.put("name", "确认中");
            map.put("color", "burlywood");
            resultMap.put("itemStyle", map);
        }
        return resultMap;
    }


    /**
     * 解析 每一个部门的列表
     *
     * @param list
     * @param jxEmoloyeeNameMapMap
     * @return
     */
    public void parseJXRecordList(List list, Map<String, Object> jxEmoloyeeNameMapMap) {
        for (Object record : list) {
            String employeeIdStr = null;
            Integer type = 0;
            //如果是维护类的示例  否则判断是缺陷类的实例
            if (record instanceof MaintainRecord) {
                type = 1;
                employeeIdStr = ((MaintainRecord) record).getEmployeeId();
            } else if (record instanceof Defect) {
                employeeIdStr = ((Defect) record).getEmpIds();
                type = 0;
            }
            if (employeeIdStr == null || "".equals(employeeIdStr.trim())) {
                continue;
            }
            //解析数据
            parseJXRecord(type, employeeIdStr, jxEmoloyeeNameMapMap);
        }
    }

    /**
     * 解析每一条记录
     *
     * @param employeeIdStr
     * @param jxEmoloyeeNameMapMap
     * @return
     */
    public void parseJXRecord(Integer type, String employeeIdStr, Map<String, Object> jxEmoloyeeNameMapMap) {
        Map<String, Object> emoloyeeNameMap = null;
        if (employeeIdStr != null && !"".equals(employeeIdStr.trim())) {
            String[] employeeIds = employeeIdStr.split(",");
            if (employeeIds.length > 0) {
                for (String employeeId : employeeIds) {
                    //jxEmployeeNameMapMap中是否含有该用户编号的key  存在则在该员工的任务数量加1,不存在则添加该员工
                    if (!jxEmoloyeeNameMapMap.containsKey(employeeId)) {
                        //查询用户名并初始化任务数量为一
                        emoloyeeNameMap = new HashMap<>();
                        Users usersByEmployeeId = userService.getUserByEmployeeId(employeeId);
                        if (usersByEmployeeId != null) {
                            emoloyeeNameMap.put("name", usersByEmployeeId.getUserName());
                            emoloyeeNameMap.put("taskNum0", 0);
                            emoloyeeNameMap.put("taskNum1", 0);
                            emoloyeeNameMap.put("taskNum" + type, 1);
                            jxEmoloyeeNameMapMap.put(employeeId, emoloyeeNameMap);
                        }
                    } else {
                        //根据employeeId查询数据,并使任务数据加一
                        emoloyeeNameMap = (Map<String, Object>) jxEmoloyeeNameMapMap.get(employeeId);
                        emoloyeeNameMap.put("taskNum" + type, (Integer) emoloyeeNameMap.get("taskNum" + type) + 1);
                        jxEmoloyeeNameMapMap.put(employeeId, emoloyeeNameMap);
                    }
                }
            }
        }
    }


    /**
     * 根据部门得到地区码
     *
     * @param departmentId
     * @return
     */
    public Map<String, Object> getCityCodeAndNameByDepartmentId(Integer departmentId) {
        Map<String, Object> map = new HashMap<>();
        if (departmentId == 17 || departmentId == 18) {
            map.put("cityCode", "101210301");
            map.put("cityName", "嘉兴市");
        } else if (departmentId == 19) {
            map.put("cityCode", "101210901");
            map.put("cityName", "浦江县");
        } else {
            map.put("cityCode", "101210101");
            map.put("cityName", "杭州市");
        }
        return map;
    }


    @GetMapping("/getPersonalTasks1")
    @ResponseBody
    public Result getPersonalTask() {
        Subject subject = SecurityUtils.getSubject();
        Users users = (Users) subject.getPrincipal();
        if (users == null) {
            return Result.fail("用户失效");
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Map<String, Object> resultMap = new HashMap<>();
        Map<String, Object> queryMap = new HashMap<>();
        List<Maintain> maintainList = new ArrayList<>();
        if (subject.isPermitted("分配维护配置")) {
            Integer departmentId = null;
            if (!subject.isPermitted("查询所有部门维护引导")) {
                departmentId = users.getDepartmentId();
            }
            queryMap.put("departmentId", departmentId);
            queryMap.put("assignmentStatus", "0");
            queryMap.put("isToAssign", true);
            maintainList = indexDataService.getMintainByMap(queryMap);
        }
        resultMap.put("maintains", maintainList);
        queryMap.clear();
        queryMap.put("departmentId", users.getDepartmentId());
        queryMap.put("employeeId", users.getEmployeeId());
        queryMap.put("isToFinish", true);
        List<MaintainRecord> maintainRecordList = indexDataService.getMaintainRecordByMap(queryMap);
        maintainRecordList = maintainRecordList == null ? new ArrayList<>() : maintainRecordList;
        resultMap.put("maintainRecords", maintainRecordList);

        queryMap.clear();
        List<Defect> defectTotalList = new ArrayList<>();
        Integer departmentId = null;
        if (!subject.isPermitted("缺陷管理员")) {
            departmentId = users.getDepartmentId();
        }
        queryMap.put("departmentId", departmentId);
        queryMap.put("isToDo", "0");
        //待分配和待确认
        List<Defect> defectList = indexDataService.getDefectByMap(queryMap);
        if (defectList != null && defectList.size() > 0) {
            defectTotalList.addAll(defectList);
        }
        queryMap.clear();
        queryMap.put("departmentId", departmentId);
        queryMap.put("employeeId", users.getEmployeeId());
        queryMap.put("isToDo", "1");
        defectList = indexDataService.getDefectByMap(queryMap);
        if (defectList != null && defectList.size() > 0) {
            defectTotalList.addAll(defectList);
        }
        resultMap.put("defects", defectTotalList);
        return Result.ok(0, resultMap);
    }


}
