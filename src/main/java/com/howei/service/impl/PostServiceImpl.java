package com.howei.service.impl;

import com.howei.mapper.PostMapper;
import com.howei.pojo.Post;
import com.howei.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostMapper postMapper;

    @Override
    public List<Post> getPostList(String companyId) {
        return postMapper.getPostList(companyId);
    }

    @Override
    public Post getPost(Post post) {
        return postMapper.getPost(post);
    }

    @Override
    public int addPost(Post post) {
        return postMapper.addPost(post);
    }

    @Override
    public int updatePost(Post post) {
        return postMapper.updatePost(post);
    }

    @Override
    public Map<Integer, Object> getPostMap() {
        List<Map<String, Object>> list=postMapper.getPostMap();
        Map<Integer,Object> result=new HashMap<>();
        for (Map<String,Object> map:list) {
            Integer id=(int)map.get("id");
            result.put(id,map.get("name"));
        }
        return result;
    }
}
