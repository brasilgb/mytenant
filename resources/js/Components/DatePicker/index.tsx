import React, { useContext, useEffect } from "react";
import DatePicker, {
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import moment from "moment";
import { CustomLocale } from "./LocaleCalendar";
import { Link, router } from "@inertiajs/react";
import { useAuthContext } from "@/Contexts";
import { IoHome, IoReload, IoSearch } from "react-icons/io5";

const DatePickerRange = () => {
  const { setDataInicial, setDataFinal, selectedRange, setSelectedRange, setExecuteRange, dataInicial, dataFinal } = useAuthContext();
  // const { selectedRange, executeRange, setExecuteRange } = useAuthContext();

  const handleRangeSelected = () => {
    router.get('sales', {
      'dtini': moment(dataInicial).format("YYYYMMDD"),
      'dtfim': moment(dataFinal).format("YYYYMMDD")
    });
  }
  const formatInputRange = () => {
    if (!selectedRange?.from || !selectedRange?.to) return '';
    return `${('0' + selectedRange.from?.day).slice(-2) + '/' + ('0' + selectedRange.from?.month).slice(-2) + '/' + selectedRange.from?.year + ' - ' + ('0' + selectedRange.to?.day).slice(-2) + '/' + ('0' + selectedRange.to?.month).slice(-2) + '/' + selectedRange.to?.year}`;
  };

  useEffect(() => {
    if (selectedRange?.from != null && selectedRange?.to != null) {

      setDataInicial(
        moment(
          selectedRange.from?.year +
          "-" +
          selectedRange.from?.month +
          "-" +
          selectedRange.from?.day,
          "YYYY-MM-DD",
        ).toDate(),
      );

      setDataFinal(
        moment(
          selectedRange.to?.year +
          "-" +
          selectedRange.to?.month +
          "-" +
          selectedRange.to?.day,
          "YYYY-MM-DD",
        ).toDate(),
      );
    }
  }, [selectedRange, setDataInicial, setDataFinal, setExecuteRange]);

  const handleSelectedRange = () => {
    setSelectedRange({
      from: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
      to: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
    });

    setDataInicial({
      from: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
      to: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
    });

    setDataFinal({
      from: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
      to: {
        year: parseInt(moment().format('YYYY')),
        month: parseInt(moment().format('MM')),
        day: parseInt(moment().format('DD')),
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Link
        href={route('sales')}
        className="text-sm p-1 font-bold bg-gray-50 rounded-md shadow-md border border-white text-gray-500 mr-1 cursor-pointer">
        <IoHome size={22} />
      </Link>
      <div className="text-sm p-1 font-bold bg-gray-50 rounded-md shadow-md border border-white text-gray-500 mr-1 cursor-pointer">
        <IoReload size={22} onClick={() => handleSelectedRange()} />
      </div>
      <div className="flex items-center justify-center px-1 text-sm font-bold bg-gray-50 rounded-md shadow-md border border-white text-gray-500"> 
        <DatePicker
          value={selectedRange}
          onChange={setSelectedRange}
          inputPlaceholder={`${moment().format("DD/MM/YYYY")} - ${moment().format("DD/MM/YYYY")}`}
          formatInputText={formatInputRange}
          inputClassName="!text-sm !font-bold !text-gray-500 !rounded-l-md !border-y-0 !border-l-0 !bg-gray-50 !border-r !border-r-gray-300 !mr-1" // custom class
          calendarClassName="responsive-calendar"
          shouldHighlightWeekends
          locale={CustomLocale}
        />
        <IoSearch size={22} onClick={() => handleRangeSelected()} className="cursor-pointer" />
      </div>

    </div>
  );
};
export default DatePickerRange;

