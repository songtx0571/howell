<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="js/jquery.min.js"></script>
    <script src="js/week/alert.js"></script>
    <script src="js/week/departmentManagement.js"></script>
    <link rel="stylesheet" href="css/departmentManagement.css">
</head>
<body>
    <div class="warp">
        <%--公司--%>
        <div class="left">
            <h1 style="text-align: center;margin-bottom: 20px">公司信息</h1>
            <button class="addBtn" onclick="showAddCompany()">添加公司</button>
            <table class="companyTable">
                <thead>
                <tr>
                    <th width='5%'>选择</th>
                    <th>公司名称</th>
                    <th width='52%'>状态</th>
                    <th width='8%'>操作</th>
                </tr>
                </thead>
                <tbody id='companyTbody'>

                </tbody>
            </table>
            <%--修改公司页面--%>
            <div class="updateCompany">
                <h1 style="text-align: center;margin-bottom: 30px">修改公司</h1>
                <input type="hidden" id='updataCompanyId'/>
                <input type="hidden" id='updataCompanyIsActive'/>
                <span>公司名称:</span>
                <input type="text" id="updataInput">
                <divs style="clear: both"></divs>
                <div class="btnBox">
                    <button onclick="updateCompany(id)">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--添加公司页面--%>
            <div class="addCompany">
                <h1 style="text-align: center;margin-bottom: 30px">添加公司</h1>
                <span>公司名称:</span>
                <input type="text" id="addInput">
                <divs style="clear: both"></divs>
                <div class="btnBox">
                    <button onclick="addCompany()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
        </div>
        <%--部门--%>
        <div class="right">
            <h1 style="text-align: center;margin-bottom: 20px">部门信息</h1>
            <%--<h3 style="text-align: center;margin-bottom: 20px">请勾选公司后，在操作部门</h3>--%>
            <button class="addBtn" onclick="showAddDepartment()" id="showAddDepartmentBtn">添加部门</button>
            <table class="departmentTable">
                <thead>
                <tr>
                    <th>部门名称</th>
                    <th style="width: 5%">代号</th>
                    <th style="width: 52%;">状态</th>
                    <th style="width: 8%;">操作</th>
                </tr>
                </thead>
                <tbody id='departmentTbody'>

                </tbody>
            </table>
            <%--添加部门页面--%>
            <div class="addDepartment">
                <h1 style="text-align: center;margin-bottom: 30px">添加部门</h1>
                <div>
                    <span>部门名称:</span>
                    <input type="text" id="addDepartmentInput">
                    <input type="hidden" id='addDepartmentId'/>
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>部门代号:</span>
                    <input type="text" id="addDepartmentCodeName">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button onclick="addDepartment()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
            <%--修改部门页面--%>
            <div class="updataDepartment">
                <h1 style="text-align: center;margin-bottom: 30px">修改部门</h1>
                <div>
                    <span>部门名称:</span>
                    <input type="text" id="updataDepartmentInput">
                    <input type="hidden" id='updataDepartmentId'/>
                </div>
                <div style="clear: both"></div>
                <div>
                    <span>部门代号:</span>
                    <input type="text" id="updataDepartmentCodeName">
                </div>
                <div style="clear: both"></div>
                <div class="btnBox">
                    <button onclick="updataDepartment()">确定</button>
                    <button onclick="cancel()">取消</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
