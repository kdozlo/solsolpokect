package team21.solsolpokect.common.entity;

import java.time.LocalDateTime;
import java.time.YearMonth;

public class DateUtils {
    public static LocalDateTime getStartOfMonth(String year, String month) {
        int intYear = Integer.parseInt(year);
        int intMonth = Integer.parseInt(month);

        return LocalDateTime.of(intYear, intMonth, 1,0,0); // 해당 년도와 월의 1일을 반환
    }

    public static LocalDateTime getEndOfMonth(String year, String month) {
        int intYear = Integer.parseInt(year);
        int intMonth = Integer.parseInt(month);

        YearMonth yearMonth = YearMonth.of(intYear, intMonth);
        return LocalDateTime.of(intYear, intMonth, yearMonth.atEndOfMonth().getDayOfMonth(),23,59); // 해당 년도와 월의 마지막 날짜를 반환
    }
}
