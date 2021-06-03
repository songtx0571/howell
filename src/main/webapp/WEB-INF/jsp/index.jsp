<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>浩维管理首页</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="icon" href="img/logo.png" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script type="text/javascript" src="js/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="layui/css/layui.css" />
    <script src="layui/layui.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="css/index.css"/>
    <link rel="stylesheet" href="js/font1/iconfont.css">
    <script src="js/week/index.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/week/echarts.min.js"></script>
</head>
<body>
<div class="warp">
    <div class="notice" id="notice">
        <ul id="noticeUl" style=""></ul>
    </div>
    <div class="pinjie"></div>
    <%--<div class="warp1">
        <div class="title">
            <i class="title_quote"></i>
            <span class="title_name">嘉爱斯项目部</span>
        </div>
        <div class="clear"></div>
        <div class="weatherBox">
            <p>
                <span class="iconfont icon-dizhi" style="margin-right: 11px;color: #0000FF;"></span>
                <span class="weather_address weather_address1">杭州市</span>
&lt;%&ndash;                <button class="weather_switchBtn" onclick="weatherSwitch('1')">切换</button>&ndash;%&gt;
                <select name="" class="weather_select weather_select1" onchange="weather_sel(1,this.options[this.options.selectedIndex].value)">
                    <option value="101210101">杭州市</option>
                    <option value="101211101">舟山市</option>
                    <option value="101210201">湖州市</option>
                    <option value="101210301">嘉兴市</option>
                    <option value="101210901">金华市</option>
                    <option value="101210501">绍兴市</option>
                    <option value="101210601">台州市</option>
                    <option value="101210701">温州市</option>
                    <option value="101210801">丽水市</option>
                    <option value="101211001">衢州市</option>
                    <option value="101210401">宁波市</option>
                </select>
            </p>
            <p class="weather_toDay"></p>
            <div class="weather_carousel weather_carousel1">

            </div>
            <div class="clear"></div>
            &lt;%&ndash;<ul class="weather_point weather_point1">
                <li></li>
                <li></li>
                <li></li>
            </ul>&ndash;%&gt;
        </div>
        <div class="functionDivDown">
            <ul>
                <li>
                    <p><span class="iconfont icon-triangle-right
" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检次数</span></p>
                    <canvas id="one" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
							" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检点数</span></p>
                    <canvas id="two" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
							" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当天缺陷数</span></p>
                    <div id="main" style="width: 64px;height:64px;margin: 10px auto 0;"></div>
                    <script>
                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById('main'));

                        // 指定图表的配置项和数据
                        option = {
                            tooltip: {
                                trigger: 'item'
                            },
                            series: [
                                {
                                    name: '缺陷',
                                    type: 'pie',
                                    radius: ['60%', '90%'],
                                    avoidLabelOverlap: false,
                                    itemStyle: {
                                        borderRadius: 0,
                                        borderColor: '#fff',
                                        borderWidth: 1
                                    },
                                    label: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '14',
                                            fontWeight: 'bold'
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    data: [
                                        {value: 50, name: '未认领',itemStyle:{color:"red"}},
                                        {value: 50, name: '',itemStyle:{color:"#dcb422"}}
                                    ]
                                }
                            ]
                        };

                        option && myChart.setOption(option);
                    </script>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
							" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当月缺陷数</span></p>
                    <div id="main1" style="width: 64px;height:64px;margin: 10px auto 0;"></div>
                    <script>
                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById('main1'));

                        // 指定图表的配置项和数据
                        option = {
                            tooltip: {
                                trigger: 'item'
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['60%', '90%'],
                                    avoidLabelOverlap: false,
                                    itemStyle: {
                                        borderRadius: 0,
                                        borderColor: '#fff',
                                        borderWidth: 1
                                    },
                                    label: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '14',
                                            fontWeight: 'bold'
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    data: [
                                        {value: 50, name: '未认领',itemStyle:{color:"red"}},
                                        {value: 50, name: '已认领',itemStyle:{color:"#dcb422"}},
                                        {value: 60, name: '消缺中',itemStyle:{color:"#ff8100"}},
                                        {value: 41, name: '已消缺',itemStyle:{color:"#8fc323"}},
                                        {value: 55, name: '已完成',itemStyle:{color:"green"}},
                                        {value: 77, name: '延期中',itemStyle:{color:"#001580"}}
                                    ]
                                }
                            ]
                        };

                        option && myChart.setOption(option);
                    </script>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
							" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前维护中</span></p>
                    <canvas id="four" width="64" height="64"></canvas>
                </li>
                &lt;%&ndash;<li>
                    <p><i
                            style="display: inline-block;width: 6px;height: 6px;background: #0056FF;border-radius: 50%;"></i>&nbsp;<span
                            class="functionUp_title">完成</span><i
                            style="display: inline-block;width: 6px;height: 6px;background: #F7D643;border-radius: 50%;margin-left: 21px;"></i>&nbsp;<span
                            class="functionUp_title">新开</span></p>
                    <canvas id="three" width="64" height="64"></canvas>
                </li>&ndash;%&gt;
            </ul>
        </div>
        <div class="clear"></div>
        <div class="functionDivUp">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="functionUp_title">运行人员名单</span></p>
            <i class="functionUp_line"></i>
            <ul class="functionUp_person functionUp_person0">
                <li>王英明明</li>
                <li>王红卫</li>
                <li>姚嘉峪</li>
                <li>张豪强</li>
                <li>张豪强</li>
                <li>姚嘉峪</li>
            </ul>
        </div>
        <div class="overhaulBox">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="overhaul_title">检修人员名单</span></p>
            <i class="overhaul_line"></i>
            <ul class="overhaul_person overhaul_person0">

            </ul>
        </div>
        <div class="clear"></div>
    </div>
    <div class="warp1">
        <div class="title">
            <i class="title_quote"></i>
            <span class="title_name">泰爱斯项目部</span>
        </div>
        <div class="clear"></div>
        <div class="weatherBox">
            <p>
                <span class="iconfont icon-dizhi" style="margin-right: 11px;color: #0000FF;"></span>
                <span class="weather_address weather_address2">杭州市</span>
&lt;%&ndash;                <button class="weather_switchBtn" onclick="weatherSwitch('2')">切换</button>&ndash;%&gt;
                <select name="" class="weather_select weather_select2" onchange="weather_sel(2,this.options[this.options.selectedIndex].value)">
                    <option value="101210101">杭州市</option>
                    <option value="101211101">舟山市</option>
                    <option value="101210201">湖州市</option>
                    <option value="101210301">嘉兴市</option>
                    <option value="101210901">金华市</option>
                    <option value="101210501">绍兴市</option>
                    <option value="101210601">台州市</option>
                    <option value="101210701">温州市</option>
                    <option value="101210801">丽水市</option>
                    <option value="101211001">衢州市</option>
                    <option value="101210401">宁波市</option>
                </select>
            </p>
            <p class="weather_toDay"></p>
            <div class="weather_carousel weather_carousel2">

            </div>
            <div class="clear"></div>
            &lt;%&ndash;<ul class="weather_point weather_point2">
                <li></li>
                <li></li>
                <li></li>
            </ul>&ndash;%&gt;
        </div>
        <div class="functionDivDown">
            <ul>
                <li>
                    <p><span class="iconfont icon-triangle-right
		" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检次数</span></p>
                    <canvas id="five" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
									" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检点数</span></p>
                    <canvas id="six" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><i
                            style="display: inline-block;width: 6px;height: 6px;background: #0056FF;border-radius: 50%;"></i>&nbsp;<span
                            class="functionUp_title">完成</span><i
                            style="display: inline-block;width: 6px;height: 6px;background: #F7D643;border-radius: 50%;margin-left: 21px;"></i>&nbsp;<span
                            class="functionUp_title">新开</span></p>
                    <canvas id="seven" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
									" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前维护中</span></p>
                    <canvas id="eight" width="64" height="64"></canvas>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
        <div class="functionDivUp">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="functionUp_title">运行人员名单</span></p>
            <i class="functionUp_line"></i>
            <ul class="functionUp_person functionUp_person1">
                <li>王英明明</li>
                <li>王红卫</li>
                <li>姚嘉峪</li>
                <li>张豪强</li>
                <li>张豪强</li>
                <li>姚嘉峪</li>
            </ul>
        </div>
        <div class="overhaulBox">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="overhaul_title">检修人员名单</span></p>
            <i class="overhaul_line"></i>
            <ul class="overhaul_person overhaul_person1">

            </ul>
        </div>
        <div class="clear"></div>
    </div>
    <div class="warp1">
        <div class="title">
            <i class="title_quote"></i>
            <span class="title_name">浦江项目部</span>
        </div>
        <div class="clear"></div>
        <div class="weatherBox">
            <p>
                <span class="iconfont icon-dizhi" style="margin-right: 11px;color: #0000FF;"></span>
                <span class="weather_address weather_address3">杭州市</span>
&lt;%&ndash;                <button class="weather_switchBtn" onclick="weatherSwitch('3')">切换</button>&ndash;%&gt;
                <select name="" class="weather_select weather_select3" onchange="weather_sel(3,this.options[this.options.selectedIndex].value)">
                    <option value="101210101">杭州市</option>
                    <option value="101211101">舟山市</option>
                    <option value="101210201">湖州市</option>
                    <option value="101210301">嘉兴市</option>
                    <option value="101210901">金华市</option>
                    <option value="101210501">绍兴市</option>
                    <option value="101210601">台州市</option>
                    <option value="101210701">温州市</option>
                    <option value="101210801">丽水市</option>
                    <option value="101211001">衢州市</option>
                    <option value="101210401">宁波市</option>
                </select>
            </p>
            <p class="weather_toDay"></p>
            <div class="weather_carousel weather_carousel3">

            </div>
            <div class="clear"></div>
            &lt;%&ndash;<ul class="weather_point weather_point3">
                <li></li>
                <li></li>
                <li></li>
            </ul>&ndash;%&gt;
        </div>

        <div class="functionDivDown">
            <ul>
                <li>
                    <p><span class="iconfont icon-triangle-right
		" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检次数</span></p>
                    <canvas id="nine" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
									" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检点数</span></p>
                    <canvas id="ten" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><i
                            style="display: inline-block;width: 6px;height: 6px;background: #0056FF;border-radius: 50%;"></i>&nbsp;<span
                            class="functionUp_title">完成</span><i
                            style="display: inline-block;width: 6px;height: 6px;background: #F7D643;border-radius: 50%;margin-left: 21px;"></i>&nbsp;<span
                            class="functionUp_title">新开</span></p>
                    <canvas id="eleven" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
									" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前维护中</span></p>
                    <canvas id="twelve" width="64" height="64"></canvas>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
        <div class="functionDivUp">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="functionUp_title">运行人员名单</span></p>
            <i class="functionUp_line"></i>
            <ul class="functionUp_person functionUp_person2">
                <li>王英明明</li>
                <li>王红卫</li>
                <li>姚嘉峪</li>
                <li>张豪强</li>
                <li>张豪强</li>
                <li>姚嘉峪</li>
            </ul>
        </div>
        <div class="overhaulBox">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="overhaul_title">检修人员名单</span></p>
            <i class="overhaul_line"></i>
            <ul class="overhaul_person overhaul_person2">

            </ul>
        </div>
        <div class="clear"></div>
    </div>
    <div class="warp1">
        <div class="title">
            <i class="title_quote"></i>
            <span class="title_name">临江项目部</span>
        </div>
        <div class="clear"></div>
        <div class="weatherBox">
            <p>
                <span class="iconfont icon-dizhi" style="margin-right: 11px;color: #0000FF;"></span>
                <span class="weather_address weather_address4">杭州市</span>
&lt;%&ndash;                <button class="weather_switchBtn" onclick="weatherSwitch('4')">切换</button>&ndash;%&gt;
                <select name="" class="weather_select weather_select4" onchange="weather_sel(4,this.options[this.options.selectedIndex].value)">
                    <option value="101210101">杭州市</option>
                    <option value="101211101">舟山市</option>
                    <option value="101210201">湖州市</option>
                    <option value="101210301">嘉兴市</option>
                    <option value="101210901">金华市</option>
                    <option value="101210501">绍兴市</option>
                    <option value="101210601">台州市</option>
                    <option value="101210701">温州市</option>
                    <option value="101210801">丽水市</option>
                    <option value="101211001">衢州市</option>
                    <option value="101210401">宁波市</option>
                </select>
            </p>
            <p class="weather_toDay"></p>
            <div class="weather_carousel weather_carousel4">

            </div>
            <div class="clear"></div>
            &lt;%&ndash;<ul class="weather_point weather_point4">
                <li></li>
                <li></li>
                <li></li>
            </ul>&ndash;%&gt;
        </div>
        <div class="functionDivDown">
            <ul>
                <li>
                    <p><span class="iconfont icon-triangle-right
		" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检次数</span></p>
                    <canvas id="thirteen" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
									" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前巡检点数</span></p>
                    <canvas id="fourteen" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><i
                            style="display: inline-block;width: 6px;height: 6px;background: #0056FF;border-radius: 50%;"></i>&nbsp;<span
                            class="functionUp_title">完成</span><i
                            style="display: inline-block;width: 6px;height: 6px;background: #F7D643;border-radius: 50%;margin-left: 21px;"></i>&nbsp;<span
                            class="functionUp_title">新开</span></p>
                    <canvas id="fifteen" width="64" height="64"></canvas>
                </li>
                <li>
                    <p><span class="iconfont icon-triangle-right
									" style="margin-right: 8px;color: #0000FF;"></span><span class="functionUp_title">当前维护中</span></p>
                    <canvas id="sixteen" width="64" height="64"></canvas>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
        <div class="functionDivUp">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="functionUp_title">运行人员名单</span></p>
            <i class="functionUp_line"></i>
            <ul class="functionUp_person functionUp_person3">
                <li>王英明明</li>
                <li>王红卫</li>
                <li>姚嘉峪</li>
                <li>张豪强</li>
                <li>张豪强</li>
                <li>姚嘉峪</li>
            </ul>
        </div>
        <div class="overhaulBox">
            <p><span class="iconfont icon-peoples" style="margin-right: 11px;color: #0000FF;"></span><span
                    class="overhaul_title">检修人员名单</span></p>
            <i class="overhaul_line"></i>
            <ul class="overhaul_person overhaul_person3">

            </ul>
        </div>
        <div class="clear"></div>
    </div>--%>
</div>

</body>
</html>
