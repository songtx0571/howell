<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" href="css/LayIMManagement.css">
    <script type="text/javascript" src="js/week/dynamicRegion.js"></script>
    <script src="layui/layui.js"></script>
    <link rel="stylesheet" href="layui/css/layui.css">
    <script type="text/javascript" src="layui/formSelects-v4.js"></script>
    <link rel="stylesheet" href="layui/formSelects-v4.css">
    <style>
        .layui-input-inline .xm-select-parent .xm-select {
            height: 36px;
        }
        .customColor{
            width: 100%;
            height: 100%;
            display: none;
            padding: 10px 10px;
            box-sizing: border-box;
        }
        .customColor table{
            width: 650px;
            margin: 10px auto;
        }
        .customColor table tr{
            line-height: 70px;
        }
        .customColor{
            width: 100%;
            height: 100%;
            display: none;
            padding: 10px 10px;
            box-sizing: border-box;
        }
        .customColor table{
            width: 650px;
            margin: 10px auto;
        }
        .customColor table tr{
            line-height: 70px;
        }
    </style>
</head>
<body>
<div class="warp">
    <div style="text-align: center;padding-top: 10px;box-sizing: border-box;">
        <button type="button" class="layui-btn layui-btn-normal" onclick="showCustomDiv()">自定义级别</button>
    </div>
    <div class="content">
        <table id="demo" lay-filter="test"></table>
        <script type="text/html" id="barDemo">
            {{# if(d.isRead==1){  }}
            <span>已读</span>
            {{# }else{  }}
            <a class="layui-btn layui-btn-xs" lay-event="daile">查看</a>
            {{# }  }}
        </script>
    </div>
    <div class="customColor">
        <input type="hidden" id="idHidden">
        <input type="hidden" id="timeHidden">
        <input type="hidden" id="guideHidden">
        <input type="hidden" id="howellHidden">
        <input type="hidden" id="defectHidden">
        <input type="hidden" id="examHidden">
        <input type="hidden" id="AIHidden">
        <input type="hidden" id="waHidden">
        <form class="layui-form" action="" style="margin-bottom: 10px;text-align: center;" target="iframe1">
            <table>
                <tr>
                    <td>时间</td>
                    <td colspan="3">
                        <div class="layui-input-inline" style="width: 560px;">
                            <select name="modules" lay-verify="required" lay-filter="selTime" lay-search=""
                                    id="selTime">
                                <option value="10000">10秒</option>
                                <option value="15000">15秒</option>
                                <option value="20000">20秒</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: center;">
                        0级:<span style="color: #000000;">黑色</span>&nbsp;&nbsp;&nbsp;1级:<span
                            style="color: #cc00ff;">紫色</span>&nbsp;&nbsp;&nbsp;
                        2级:<span style="color: #0008ff;">蓝色</span>&nbsp;&nbsp;&nbsp;3级:<span
                            style="color: #62ff00;">绿色</span>&nbsp;&nbsp;&nbsp;
                        4级:<span style="color: #ff8100;">橘色</span>&nbsp;&nbsp;&nbsp;5级:<span
                            style="color: #ff0000;">红色</span>
                    </td>
                </tr>
                <tr>
                    <td>howell</td>
                    <td>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selHowell" lay-search=""
                                    id="selHowell">
                                <option value="0">0级</option>
                                <option value="1">1级</option>
                                <option value="2">2级</option>
                                <option value="3">3级</option>
                                <option value="4">4级</option>
                                <option value="5">5级</option>
                            </select>
                        </div>
                    </td>
                    <td>guide</td>
                    <td>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selGuide" lay-search=""
                                    id="selGuide">
                                <option value="0">0级</option>
                                <option value="1">1级</option>
                                <option value="2">2级</option>
                                <option value="3">3级</option>
                                <option value="4">4级</option>
                                <option value="5">5级</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>defect</td>
                    <td>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selDefect" lay-search=""
                                    id="selDefect">
                                <option value="0">0级</option>
                                <option value="1">1级</option>
                                <option value="2">2级</option>
                                <option value="3">3级</option>
                                <option value="4">4级</option>
                                <option value="5">5级</option>
                            </select>
                        </div>
                    </td>
                    <td>exam</td>
                    <td>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selExam" lay-search=""
                                    id="selExam">
                                <option value="0">0级</option>
                                <option value="1">1级</option>
                                <option value="2">2级</option>
                                <option value="3">3级</option>
                                <option value="4">4级</option>
                                <option value="5">5级</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>AI</td>
                    <td>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selAI" lay-search="" id="selAI">
                                <option value="0">0级</option>
                                <option value="1">1级</option>
                                <option value="2">2级</option>
                                <option value="3">3级</option>
                                <option value="4">4级</option>
                                <option value="5">5级</option>
                            </select>
                        </div>
                    </td>
                    <td>wa</td>
                    <td>
                        <div class="layui-input-inline">
                            <select name="modules" lay-verify="required" lay-filter="selWa" lay-search="" id="selWa">
                                <option value="0">0级</option>
                                <option value="1">1级</option>
                                <option value="2">2级</option>
                                <option value="3">3级</option>
                                <option value="4">4级</option>
                                <option value="5">5级</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: center">
                        <button type="button" class="layui-btn layui-btn-normal" onclick="customOk()">确定</button>
                        <button type="button" class="layui-btn layui-btn-normal" onclick="cancel()">取消</button>
                    </td>
                </tr>
            </table>
        </form>
        <iframe id="iframe1" name="iframe1" style="display:none;"></iframe>
    </div>
</div>
</body>
</html>
