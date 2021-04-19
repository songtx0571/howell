package com.howei;

import com.howei.pojo.Group;
import com.howei.service.GroupService;
import com.howei.service.OperationRecordService;
import com.howei.util.Page;
import com.howei.util.Result;
import org.apache.commons.collections.ArrayStack;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

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

    /**
     * 模拟修改权限
     */
    @Test
    public void test1(){
        Integer nums1[] = {100, 1, 2, 5, 7, -1};
        Integer nums2[] = {1, -1, 2, 4, 12, 3, -12};
        Set<Integer> set1=compare1(nums1, nums2);
        Set<Integer> set2=compare2(nums1,set1);
        Set<Integer> set3=compare3(nums2,set1);
    }

    public static Set<Integer> compare1(Integer[] arr1, Integer[] arr2) {
        Set<Integer> set1 = new HashSet<>(Arrays.asList(arr1));
        Set<Integer> set2 = new HashSet<>(Arrays.asList(arr2));
        Set<Integer> set3 = new HashSet<>(set2);

        set3.addAll(set1);
        set1.retainAll(set2);
        set3.removeAll(set1);
        return set3;
    }

    //set3与set1比较，获取交集：即删减的权限
    public static Set<Integer> compare2(Integer[] arr1,Set<Integer> set2){
        Set<Integer> set1 = new HashSet<>(Arrays.asList(arr1));
        Set<Integer> set3 = new HashSet<>(set2);
        set3.retainAll(set1);
        return set3;
    }

    //set3与set2比较，获取交集：即新增的权限
    public static Set<Integer> compare3(Integer[] arr2,Set<Integer> set1) {
        Set<Integer> set2 = new HashSet<>(Arrays.asList(arr2));
        Set<Integer> set3 = new HashSet<>(set1);
        set3.retainAll(set2);
        return set3;
    }
}
