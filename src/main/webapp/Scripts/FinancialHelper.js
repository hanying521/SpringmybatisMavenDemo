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

$(function () {
    if ($('#State').html() == "等待财务部审核") {
        $('#ReimburseCostAll').focus(function () {
            var StayCostAll = $('#StayCostAll').val();
            var FoodCostAll = $('#FoodCostAll').val();

            var TicketReimburse = $('#TicketReimburse').val(); // 车票 报销  需要 验空
            var TicketSubsidy = $('#TicketSubsidy').val(); // 车票 补助  需要 验空
            debugger;
            if (TicketReimburse === "" || isNaN(parseFloat(TicketReimburse))) {
                alert("车票报销格式不对");
                $('#TicketReimburse').focus();
                return;
            }
            if (TicketSubsidy === "" || isNaN(parseFloat(TicketSubsidy))) {
                alert("车票补助格式不对");
                $('#TicketSubsidy').focus();
                return;
            }
            var result = parseFloat(StayCostAll) + parseFloat(FoodCostAll) + parseFloat(TicketReimburse) + parseFloat(TicketSubsidy);
            $('#ReimburseCostAll').val(result);
        });
        $('#SalaryGet').focus(function () {
            var ReimburseCostAll = $('#ReimburseCostAll').val(); // 报销总计
            var Debt = $('#Debt').val(); // 借款 备用金
            var InvoiceCost = $('#InvoiceCost').val();   // 发票报销

            if (ReimburseCostAll === "" || isNaN(parseFloat(ReimburseCostAll))) {
                alert("报销总计格式不对");
                $('#ReimburseCostAll').focus();
                return;
            }
            if (Debt === "" || isNaN(parseFloat(Debt))) {
                alert("借款/备用金格式不对");
                $('#Debt').focus();
                return;
            }
            if (InvoiceCost === "" || isNaN(parseFloat(InvoiceCost))) {
                alert("发票报销格式不对");
                $('#InvoiceCost').focus();
                return;
            }
            var result = parseFloat(ReimburseCostAll) - parseFloat(Debt) - parseFloat(InvoiceCost);
            $('#SalaryGet').val(result);
        });
    } else {
        $('#TicketSubsidy').blur(function () {
            var ReimburseCostAll = $('#ReimburseCostAll').val();
            var TicketSubsidy = $('#TicketSubsidy').val();
            if (TicketSubsidy === "" || isNaN(parseFloat(TicketSubsidy)) || parseFloat(TicketSubsidy)<0) {
                alert("车票补助格式不对");
                $('#TicketSubsidy').focus();
                return;
            }
            //  在下面处理 报销总计
            var result1 =  parseFloat(ReimburseCostAll) + parseFloat(TicketSubsidy);
            $('#ReimburseCostAll').val(result1);
            // 在下面处理  计入工资部分
            var SalaryGet = $('#SalaryGet').val();
            var result2 = parseFloat(SalaryGet) + parseFloat(TicketSubsidy);
            $('#SalaryGet').val(result2);
        });
    }
})