<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>优格玛</title>

<link href="<%=path%>/StyleSheet/bootstrap.css" rel="stylesheet"
	type="text/css" />
<link href="<%=path%>/StyleSheet/font-awesome-4.3.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css" />
<link href="<%=path%>/StyleSheet/AdminTheme.css" rel="stylesheet"
	type="text/css" />
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
        <script src="<%=path%>/Scripts/html5shiv/3.7.0/html5shiv.min.js"></script>
        <script src="<%=path%>/Scripts/respond.min.js"></script>
    <![endif]-->
<script src="<%=path%>/Scripts/jquery.min.js" type="text/javascript"></script>
<script src="<%=path%>/Scripts/bootstrap-datetimepicker.js"></script>
<script src="<%=path%>/Scripts/bootstrap-datetimepicker.zh-CN.js"></script>
</head>

<body>
	<div class="navbar navbar-default" id="navbar">
        <div class="navbar-container no-padding-right" id="navbar-container">
            <div class="navbar-header pull-left" style="height: 45px">
                <a class="navbar-brand"><i class=" "> <span style="font-style: normal;">EUROCMA</span> <span class="second">差旅费报销系统</span> </i>
                </a>
            </div>
            <div class="navbar-header pull-right">
                <ul class="nav ace-nav">

                    <li class="light-blue"><a href="http://www.12306.cn/" target="_blank"><span><i class="fa fa-train"></i>12306</span></a></li>
                    <li class="light-blue">
                        <a href="javascript:void(0);">
                            <span><i class="fa fa-user fa-fw "></i> <label id="lbUserName" disbled></label>${user.name}</span>
                        </a>
                    </li>
                    <li class="light-blue">
                        <a href="javascript:parent.document.location= '<%=path%>/user/exit.do'">
                            <span> <i class="fa fa-power-off fa-fw "></i> 注销</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
