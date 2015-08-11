function Calculate() {
    if (isNaN(FoodDayStart)) {
        alert("出差天数核算标准没有正确加载，请于管理人员联系！");
        window.location.reload();
        return;
    }
    // 首先拿出所有的来 
    var countObject = $('#pathDiv>div');
    var count = countObject.length - 1;
    var zongStayNight = new Number("0"); // 统计住宿夜晚总数
    var zongFoodDay = new Number("0");  // 统计餐补白天总数

    for (var t = 1; t < count;) {
        // 1 设置值
        var startStrT = "#Path" + t + " #DepartTime";
        var endStrT = "#Path" + t + " #ReachTime";
        var startStrTNext = "#Path" + (t + 1) + " #DepartTime";  // 求当前日期的下一个 的 开始时间。
        var startStrTPrev = "#Path" + (t - 1) + " #ReachTime"; // 求当前日期的前一个 的 到达时间。
        var transprationT = "#Path" + t + " #Transportation";

        var showstaynight = "#Path" + t + " #StayNight";
        var showfoodday = "#Path" + t + " #FoodDay";

        // 2取值
        var startStr = $(startStrT).val(); // 当天的开始
        var endStr = $(endStrT).val();// 当天的结束
        var startStrNext = $(startStrTNext).val(); // 下一天的开头部分
        var startStrPrev = $(startStrTPrev).val(); // 前一天的结束部分
        var transpration = $(transprationT).val(); // 交通方式

        // 3.1 处理餐补白天数
        var FoodDay = FoodDayCalculate(startStr, startStrNext);
        // 3.1.1 处理餐补白天数误差
        if (IsFoodDay(new Date(startStrNext))) {
            FoodDay = FoodDay - 1 / 3;
        }
        // 3.2 处理住宿夜晚数
        var StayNight1 = StayNightCalculate(startStr, endStr, transpration);
        var StayNight2 = StayNightCalculate(endStr, startStrNext, "旅馆");


        // 3.2.1 处理住宿夜晚数误差
        // 处理第一部分的误差（重点在于解决，在不在同一个夜晚区间内）
        //  startStrPrev 测试 是否是第一个：第一个就不用参与这个误差纠正。最后一个也需要这个误差纠正。
        // 处理同一个夜晚 后面在计算时 也将 这个夜晚又在算一遍。
        if (startStrPrev && IsStayNight(new Date(startStrPrev)) && IsStayNight(new Date(startStr)) && IsSameNight(startStrPrev, startStr)) {
            StayNight1 = StayNight1 - 0.25;
        }
        // 处理第二部分 多出来的部分 ，比如 结尾在 20：08 这种多算1天的情况。
        if (IsStayNight(new Date(startStrNext)) && !IsSameNight(endStr, startStrNext)) {
            StayNight2 = StayNight2 - 1;
        }
        // 处理第二部分的误差（重点在于解决，减去0.25（选择旅馆方式）还是减去1（选择在火车上）的问题）
        // 减去0.25 说明选择的是 住宿方式，只有在 没有超过24点，并且下一个火车乘车开始时间不在这个夜晚里。
        if (IsStayNight(new Date(endStr))) {
            if (IsOver(new Date(endStr)) && !IsSameNight(endStr, startStrNext)) {
                StayNight1 = StayNight1 - 0.25;
            } else {
                StayNight2 = StayNight2 - 1;
            }
        }
        var StayNight = StayNight1 + StayNight2;

        // 4 处理总计
        zongStayNight = zongStayNight + StayNight;
        zongFoodDay = zongFoodDay + FoodDay;

        // 5 显示
        $(showstaynight).val(StayNight.toFixed(2));
        $(showfoodday).val(FoodDay.toFixed(2));

        // 6 下一个
        t = new Number(t) + 1;
    }


    // 处理最后一个

    // 1 设置值
    var LaststartStrT = "#Path" + count + " #DepartTime";
    var LastendStrT = "#Path" + count + " #ReachTime";
    var LaststartStrTPrev = "#Path" + (t - 1) + " #ReachTime"; // 求当前日期的前一个 的 到达时间
    var Lastshowstaynight = "#Path" + count + " #StayNight";
    var Lastshowfoodday = "#Path" + count + " #FoodDay";
    var LasttransprationT = "#Path" + count + " #Transportation";


    // 2 取值
    var LaststartStr = $(LaststartStrT).val();
    var LastendStr = $(LastendStrT).val();
    var LaststartStrPrev = $(LaststartStrTPrev).val();
    var Lasttranspration = $(LasttransprationT).val();

    // 3.1 处理餐补白天数
    var LastFoodDay = FoodDayCalculate(LaststartStr, LastendStr);
    var LastStayNight = StayNightCalculate(LaststartStr, LastendStr, Lasttranspration);
    // alert(LastFoodDay);
    // alert(LastStayNight);

    if (LaststartStrPrev && IsStayNight(new Date(LaststartStrPrev)) && IsStayNight(new Date(LaststartStr)) && IsSameNight(LaststartStrPrev, LaststartStr)) {
        LastStayNight = LastStayNight - 0.25;
    }

    // 4 处理总计
    zongStayNight = zongStayNight + LastStayNight;
    zongFoodDay = zongFoodDay + LastFoodDay;

    // 5 处理显示
    $(Lastshowstaynight).val(LastStayNight.toFixed(2));
    $(Lastshowfoodday).val(LastFoodDay.toFixed(2));
    $('#totalStayNight').val(zongStayNight.toFixed(2));
    $('#totalFoodDay').val(zongFoodDay.toFixed(2));
    return false;
}
function FoodDayCalculate(start, end) {
    var startTime = new Date(RegStartTime(start));
    var endTime = new Date(end);
    var result = new Number("0");
    var i = new Number("0");

    while (startTime <= endTime) {
        if (IsFoodDay(startTime)) {
            result++;
        }

        i = FoodDayInterval(startTime);
        startTime.setHours(startTime.getHours() + i);
    }
    return result / 3;
}
function StayNightCalculate(start, end, Transportation) {
    var startTime = new Date(RegStartTime(start));
    var endTime = new Date(end);
    var result = new Number("0");
    var i = new Number("0");

    while (startTime <= endTime) {
        if (IsStayNight(startTime)) {
            result++;
        }
        i = StayNightInterval(startTime);
        startTime.setHours(startTime.getHours() + i);
    }
    if (Transportation != "旅馆") {
        return (result / 4);
    } else {
        return result;
    }
}
function FoodDayInterval(time) {
    // var hour = new Number(new String(time).replace(/\d*-\d*-\d*\s/, "").replace(/:\d+/, ""));
    var result = new Number('0');
    var hour = time.getHours();
    if (hour >= FoodDayStart && hour < LunchStart) {
        result = LunchStart - hour;
    }
    else
        if (hour >= LunchStart && hour < LunchEnd) {
            result = LunchEnd - hour;
        }
        else
            if (hour >= LunchEnd && hour < FoodDayEnd) {
                result = FoodDayEnd - hour;
            }
            else if (hour >= FoodDayEnd && hour < 24) {
                result = 24 + FoodDayStart - hour;
            }
            else {
                result = FoodDayStart - hour;
            }
    return result;
}
function StayNightInterval(time) {
    //var hour = new Number(new String(time).replace(/\d*-\d*-\d*\s/, "").replace(/:\d+/, ""));
    var result = new Number('0');
    var hour = time.getHours();
    if (hour >= StayNightEnd && hour < StayNightStart) {
        result = StayNightStart - hour;
    }
    else
        if (hour >= StayNightStart) {
            result = StayNightEnd + 24 - hour;
        }
        else
            if (hour < StayNightEnd) {
                result = StayNightEnd - hour;
            }
    return result;
}
function RegStartTime(time) {
    var times = new String(time);
    var regExp = /:\d{2}:\d{2}/;
    return times.replace(regExp, ":00:00");
}
function IsFoodDay(time) {
    var hourtime = new Date(time).getHours();
    if (hourtime >= FoodDayStart && hourtime < FoodDayEnd) {
        return true;
    }
    else {
        return false;
    }
}
function IsStayNight(time) {
    var hourtime = new Date(time).getHours();
    if (hourtime >= StayNightEnd && hourtime < StayNightStart) {
        return false;
    }
    else {
        return true;
    }
}
// 判断两个时间点 是否在同一个夜晚区间
function IsSameNight(time1, time2) {
    var prove = new Date(time1);
    var later = new Date(time2);
    var i = new Number("0");
    i = StayNightInterval(prove);
    prove.setHours(prove.getHours() + i);
    if (prove > later) {
        return true;
    } else {
        return false;
    }
}
// 判断是否过标准点
function IsOver(time) {
    var hour = time.getHours();
    if (hour >= StayNightStart && hour <= StayNightCenter) {
        return true;
    } else {
        return false;
    }
}