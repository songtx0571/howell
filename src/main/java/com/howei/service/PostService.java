package com.howei.service;

import com.howei.pojo.Post;

import java.util.List;
import java.util.Map;

public interface PostService {

    List<Post> getPostList(String companyId);

    Post getPost(Post post);

    int addPost(Post post);

    int updatePost(Post post);

    Map<Integer,Object> getPostMap();
}
