<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <frameset id="frame" framespacing="0" border="false"  rows="45,*"  frameborder="0" scrolling="yes">
    <frame src="<%=path%>/user/top.do" name="top" id="top" scrolling="no" noresize="true" style="z-index: 100"/>
    <frameset id="myFrame" name="myFrame" cols="190,*" framespacing="0" frameborder="no" border="0" scrolling="yes">
        <frame id="left" name="left" scrolling="auto" src="<%=path%>/user/left.do" noresize="true" style="z-index: 1000"/>
        <frame id="right" name="right" scrolling="auto" src="<%=path%>/user/index.do" style="z-index: -100"/>
    </frameset>
</frameset>
<noframes>
<body>
<p>This page uses frames, but your browser doesn't support them.</p>
</body>
</noframes>
</html>
