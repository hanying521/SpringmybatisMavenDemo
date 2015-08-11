window.onload = loadDateTime;
function loadDateTime() {
    $('#ApplyTime,#ZGPersonCheckTime,#BMPersonCheckTime,#AssistantTime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('#TravelTimeStart,#TravelTimeEnd').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        minuteStep: 1,
        todayBtn: true,
        autoclose: 1
    });
};
function TravelProjectclick() {

    var productamount = document.getElementById("TravelProject4");
    if (productamount.checked) {
        var c = prompt('请输入次数');
        $("#lbTravelProject4").html('新机第（' + c + '）次去人服务');
        $("#txtnumber").val(c);
    }
    else {
        $("#lbTravelProject4").html('新机第（ ）次去人服务');
        $("#txtnumber").val(0);
    }
};
function IsSubmit() {
    var listcode = $("#ddlTravelApplicationListCode");

    if (listcode.val() == null) {
        alert("请选择要提交的清单！");
        return false;
    }
    return confirm("是否确认提交该清单！");
};
function selectProject(show) {
    if (show == "show") {
        alert("请选择出差人员。");
    }
    $.fancybox.open({
        href: 'UserDialog.aspx?name=1',
        type: 'iframe',
        padding: 5,
        width: 1000
    });
};
function clearProject() {
    $("#TravelPeople").val("");
}
function AfterSelectProject() {
    $.fancybox.close();
    var TravelPeople = $("#TravelPeople").val();
    //var TravelPeople = ""; 
    var num = $("#TravelPersonNum").val();
    for (var i = 0; i < arguments.length; i++) {
        TravelPeople = arguments[i].Name + "," + TravelPeople;
    }
    $("#TravelPeople").val(TravelPeople);
};
function LoadPath() {
    alert("填表前请仔细阅读填写说明！");
    var paths = $('div[name=path]');
    // var ins = $('.in');  && ins[i].value == ""
    for (var i = 1; i < paths.length; i++) {
        if (paths[i].style.display == 'block') {
            paths[i].style.display = 'none';
        };
    };
};
function PathWayFocus() {
    alert("需要至少填一个行程路线");
    $('#Place').focus();
}
function IsFailSubmit() {
    var listcode = $("#RejectReason");
    if ($.trim(listcode.val()) == "") {
        alert("请填写未通过理由！");
        $("#RejectReason").focus();
        return false;
    }
    return confirm("是否确认审核不通过！");
}

function IsPassSubmit() {
    return confirm("是否确认审核通过！");
}
function Undo() {
    var result = confirm('该审批单已被撤销到 未提交 中，是否跳转到未提交页面？');
    if (result == true) {
        window.location = '../TravelApplication/TravelApplicationDraft.aspx';
    }
}