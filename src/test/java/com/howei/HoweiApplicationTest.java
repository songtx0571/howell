package com.howei;

import com.howei.pojo.Group;
import com.howei.service.GroupService;
import com.howei.service.OperationRecordService;
import com.howei.util.Page;
import com.howei.util.Result;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootTest(classes = HoweiApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@DisplayName("Junit5单元测试")
public class HoweiApplicationTest {

    @Autowired
    private GroupService groupService;

    /**-------------------------------------------------群组管理----------------------------------------------------*/
    /**
     * 获取群组列表
     * @return
     */
    @Test
    @DisplayName("测试组合断言")
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
    @Autowired
    private OperationRecordService orService;
    @Test
    public void testOrService(){
        Map<String, Object> userSettingByEmployeeId = orService.getUserSettingByEmployeeId(366);
        System.out.println(userSettingByEmployeeId);
        Object exam_level = userSettingByEmployeeId.get("exam_level");
        System.out.println(exam_level);
    }
}
