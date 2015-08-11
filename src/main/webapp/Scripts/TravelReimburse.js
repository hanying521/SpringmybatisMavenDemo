window.onload = loadDateTime;
function loadDateTime() {
    $('#Time,#ProposerSignTime,#BMPersonCheckTime,#ZGPersonCheckTime,#GMPersonCheckTime,#GMPersonCheckTime_CaiWu').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        todayBtn: true
    });
    $('#TravelTimeStart,#TravelTimeEnd,#DepartTime,#ReachTime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii:ss',
        minuteStep: 1,
        todayBtn: true,
        autoclose: 1
    });
    window.FoodDayStart = new Number($("#FoodDayStart").val());
    window.LunchStart = new Number($("#LunchStart").val());
    window.LunchEnd = new Number($("#LunchEnd").val());
    window.FoodDayEnd = new Number($("#FoodDayEnd").val());
    window.StayNightStart = new Number($("#StayNightStart").val());
    window.StayNightEnd = new Number($("#StayNightEnd").val());
    window.StayNightCenter = new Number($("#StayNightCenter").val());
}
function IsSubmit() {
    var listcode = $("#ddlTravelApplicationListCode");

    if (listcode.val() == null) {
        alert("请选择要提交的清单！");
        return false;
    }
    return confirm("是否确认提交该清单！");
}
function LoadPaths() {
    var paths = $('div[name=path]');
    var ins = $('.in');
    for (var i = 1; i < paths.length; i++) {
        if (paths[i].style.display == 'block' && ins[i].value == "") {
            paths[i].style.display = 'none';
        };
    };
}
function selectProject() {
    $.fancybox.open({
        href: 'UserDialog.aspx?name=1',
        // href: '../TravelApplication/UserDialog.aspx',  // 可以采用多选框的形式
        type: 'iframe',
        padding: 5,
        width: 1000
    });
};
function AfterSelectProject(result) {
    $.fancybox.close();
    $("#ProposerName").val(result.Name);
    $("#ProposerCode").val(result.Code);
    $("#DepartmentName").val(result.Remark);
    $("#DepartmentCode").val(result.DepartmentCode);
};

function selectApplication() {
    var ProposerCode = $('#ProposerCode').val();
    if (ProposerCode == "") {
        alert("请选择申请报销人");
        return false;
    }
    var ProposerName = $('#ProposerName').val();

    var strT = "&ProposerCode=" + ProposerCode + "&ProposerName=" + ProposerName;
    $.fancybox.open({
        href: 'ApplicationSelectDialog.aspx?type=Department' + strT,
        type: 'iframe',
        padding: 5,
        width: 1000
    });
};
function AfterSelectApplication(result) {
    $.fancybox.close();
    $('#ApplicationCode').val(result.Code);
};
function showProject() {
    var code = $('#ApplicationCode').val();
    if (code != "") {
        $.fancybox.open({
            href: '../TravelReimburse/ApplicationShowDialog.aspx?Code=' + code,
            type: 'iframe',
            padding: 5,
            width: 1000
        });
    } else {
        alert("请先选择单号！");
    }
}
function PathWayFocus() {
    alert("需要至少填一个行程路线");
    $('#DepartTime').focus();
}
function IsPassSubmit() {
    return confirm("是否确认审核通过！");
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
function Undo() {
    var result = confirm('该审批单已被撤销到 未提交 中，是否跳转到未提交页面？');
    if (result == true) {
        window.location = '../TravelReimburse/TravelReimburseDraft.aspx';
    }
}