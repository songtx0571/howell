package com.howei.util;

import java.util.List;

public class Result {

    private int count;//总数
    private Object data;//数据
    private int code;
    private String msg;

    public Result() {
    }

    public Result(int count, Object data, int code, String msg) {
        this.count = count;
        this.data = data;
        this.code = code;
        this.msg = msg;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public static Result ok(int count, Object data, String msg) {
        Result result = new Result();
        result.setCount(count);
        result.setData(data);
        result.setMsg(msg);
        result.setCode(0);
        return result;
    }

    public static Result ok(int count, Object data) {
        return ok(count, data, "操作成功");
    }

    public static Result ok() {
        return ok(0, null, "操作成功");
    }

    public static Result ok(String msg) {
        return ok(0, null, msg);
    }

    public static Result fail(String msg) {
        Result result = new Result();
        result.setCode(-1);
        result.setMsg(msg);
        return result;
    }

    public static Result fail() {
        return fail("操作失败");
    }

}
