package team21.solsolpokect.common.entity;

import java.time.LocalDate;
import java.time.YearMonth;

public class DateUtils {
    public static LocalDate getStartOfMonth(String year, String month) {
        int intYear = Integer.parseInt(year);
        int intMonth = Integer.parseInt(month);

        YearMonth yearMonth = YearMonth.of(intYear, intMonth);
        return yearMonth.atDay(1); // 해당 년도와 월의 1일을 반환
    }

    public static LocalDate getEndOfMonth(String year, String month) {
        int intYear = Integer.parseInt(year);
        int intMonth = Integer.parseInt(month);

        YearMonth yearMonth = YearMonth.of(intYear, intMonth);
        return yearMonth.atEndOfMonth(); // 해당 년도와 월의 마지막 날짜를 반환
    }
}
