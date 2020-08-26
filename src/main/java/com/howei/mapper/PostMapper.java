package com.howei.mapper;

import com.howei.pojo.Post;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface PostMapper {

    List<Post> getPostList(String companyId);

    Post getPost(Post post);

    int addPost(Post post);

    int updatePost(Post post);

    List<Map<String,Object>> getPostMap();
}
