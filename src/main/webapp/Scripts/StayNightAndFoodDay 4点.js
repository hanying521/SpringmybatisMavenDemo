function Calculate() {
    // 首先拿出所有的来 
    var countObject = $('#pathDiv>div');
    var count = countObject.length - 1;
    var zongStayNight = new Number("0"); // 统计住宿夜晚总数
    var zongFoodDay = new Number("0");  // 统计餐补白天总数

    for (var t = 1; t < count;) {
        // 1 设置值
        var startStrT = "#Path" + t + " #DepartTime";
        var endStrT = "#Path" + t + " #ReachTime";
        var showstaynight = "#Path" + t + " #StayNight";
        var showfoodday = "#Path" + t + " #FoodDay";
        var startStrTPrev = "#Path" + (t - 1) + " #ReachTime"; // 求当前日期的前一个 的 到达时间。
        var startStrTNext = "#Path" + (t + 1) + " #DepartTime";  // 求当前日期的下一个 的 开始时间。
        var transprationT = "#Path" + t + " #Transportation";

        // 2取值
        var startStr = $(startStrT).val();
        var endStr = $(endStrT).val();
        var startStrNext = $(startStrTNext).val();
        var startStrNext = $(startStrTNext).val();
        var startStrPrev = $(startStrTPrev).val();
        var transpration = $(transprationT).val();

        // 3.1 处理餐补白天数
        var FoodDay = FoodDayCalculate(startStr, startStrNext);
        // 3.1.1 处理餐补白天数误差
        if (IsFoodDay(new Date(startStrNext))) {
            FoodDay = FoodDay - 1 / 3;
        }
        // 3.2 处理住宿夜晚数
        var StayNight1 = StayNightCalculate(startStr, endStr, transpration);
        //if (startStrPrev || (getTimeSpanHours(startStr, startStrPrev) < StayNightInterval(new Date(startStrPrev)))) {
        //}

        // 3.2.1 处理住宿夜晚数误差
        if (!(getTimeSpanHours(startStrNext, endStr) < StayNightInterval(new Date(endStr)))) { // 若是 后半段 在同一天 ，则不再进行计算。
            var StayNight2 = StayNightCalculate(endStr, startStrNext, "旅馆");
            if (IsStayNight(new Date(endStr))) {
                StayNight2 = StayNight2 - 1;
            }
            if (IsStayNight(new Date(startStrNext)) && getTimeSpanHours(startStrNext, endStr) > 8) {
                StayNight2 = StayNight2 - 1;
            }
        } else {
            var StayNight2 = new Number("0");
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
    // 3.2 处理住宿夜晚数
    //alert(!startStrPrev);
    //alert(!(getTimeSpanHours(startStr, startStrPrev) < StayNightInterval(new Date(startStrPrev))));
    var LastStayNight = StayNightCalculate(LaststartStr, LastendStr, Lasttranspration);
    //if (startStrPrev || (getTimeSpanHours(startStr, startStrPrev) < StayNightInterval(new Date(startStrPrev)))) {
    //}


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
    var hour = time.getHours();
    if (hour >= 6 && hour < 9) {

        result = 9 - hour;
    }
    else
        if (hour >= 9 && hour < 13) {
            result = 13 - hour;
        }
        else
            if (hour >= 13 && hour < 20) {
                result = 20 - hour;
            }
            else if (hour >= 20 && hour < 24) {
                result = 30 - hour;
            }
            else {
                result = 6 - hour;
            }
    return result;
}
function StayNightInterval(time) {
    //var hour = new Number(new String(time).replace(/\d*-\d*-\d*\s/, "").replace(/:\d+/, ""));
    var hour = time.getHours();
    if (hour >= 4 && hour < 20) {
        result = 20 - hour;
    }
    else
        if (hour >= 20) {
            result = 28 - hour;
        }
        else
            if (hour < 4) {
                result = 4 - hour;
            }
    return result;
}
function RegStartTime(time) {
    var times = new String(time);
    var regExp = /:\d{2}/;
    return times.replace(regExp, ":00");
}
function IsFoodDay(time) {
    var hourtime = new Date(time).getHours();

    if (hourtime >= 6 && hourtime < 20) {
        return true;
    }
    else {
        return false;
    }
}
function IsStayNight(time) {
    var hourtime = new Date(time).getHours();

    if (hourtime >= 4 && hourtime < 20) {
        return false;
    }
    else {
        return true;
    }
}
function getTimeSpanHours(time1, time2) {
    var pretime = new Date(time2);
    var nexttime = new Date(time1);
    return parseInt(Math.abs(nexttime - pretime) / 1000 / 60 / 60);
}