<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>优格玛</title>
    
	 <link href="<%=path%>/StyleSheet/bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="<%=path%>/StyleSheet/font-awesome-4.0.3/css/font-awesome.min.css" rel="stylesheet"
        type="text/css" />
    <link href="<%=path%>/StyleSheet/AdminTheme.css" rel="stylesheet" type="text/css" />
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
        <script src="<%=path%>/Scripts/html5shiv/3.7.0/html5shiv.min.js"></script>
        <script src="<%=path%>/Scripts/respond.min.js"></script>
    <![endif]-->
    <script src="<%=path%>/Scripts/ace-extra.min.js" type="text/javascript"></script>
    <script src="<%=path%>/Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="<%=path%>/Scripts/bootstrap.min.js" type="text/javascript"></script>
    <script src="<%=path%>/Scripts/holder.min.js" type="text/javascript"></script>
    <script src="<%=path%>/Scripts/ace-elements.min.js" type="text/javascript"></script>
    <script src="<%=path%>/Scripts/ace.min.js" type="text/javascript"></script>

  </head>
  
  <body>
    <c:forEach items="${level1}" var="menu">
  			<tr>
	  			<td>${menu.code}</td>
	  			<td>${menu.url}</td>
	  			<td><a>修改</a></td>
  			</tr>
  		</c:forEach>
  </body>
</html>
