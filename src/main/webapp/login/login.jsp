<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>登录</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="优格玛">
<meta http-equiv="description" content="优格玛">

<link href="<%=path%>/StyleSheet/bootstrap.css" rel="stylesheet" type="text/css" />
<link href="<%=path%>/StyleSheet/AdminTheme.css" rel="stylesheet" type="text/css" />

</head>
<body>
	<form action="<%=path%>/user/login.do" method="post">
		<div class="container text-center">
			<div class="space-12"></div>
			<div class="row text-center">
			<div class="col-xs-4"></div>
				<div class="col-xs-4">
					登录名：<input type="text" id="Name" name="Name" placeholder="登录名"/><br>
					密&nbsp&nbsp&nbsp码：<input type="password" id="Password" name="Password" placeholder="密码"/><br>
					<input type="submit" text="登录"><br>
					<label>${message}</label>
				</div>
			</div>

		</div>
	</form>
	<script src="<%=path%>/Scripts/jquery.min.js" type="text/javascript"></script>
	<script src="<%=path%>/Scripts/bootstrap.js" type="text/javascript"></script>
</body>
</html>
