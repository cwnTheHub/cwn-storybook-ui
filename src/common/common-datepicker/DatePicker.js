import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import momentPropTypes from "react-moment-proptypes";

import "react-dates/initialize";
import SingleDatePicker from "react-dates/lib/components/SingleDatePicker";
import DayPickerSingleDateController from "react-dates/lib/components/DayPickerSingleDateController";
import "react-dates/lib/css/_datepicker.css";

import {
  CalendarContainer,
  LabelText,
  HiddenInputFieldContainer,
} from "./styles";

import copyDictionary from "./datePickerText";
import { getCopy, safeRest } from "../../util-helpers";
import { ChevronLeft, ChevronRight } from "../../core/core-interactive-icon";

const getResponsiveDaySize = (inline) => () => {
  let responsiveDaySize;
  if (typeof window === "undefined") {
    return undefined;
  }
  if (window.innerWidth >= 432) {
    responsiveDaySize = inline ? 60 : 48;
  } else if (window.innerWidth >= 376) {
    responsiveDaySize = 40;
  } else {
    responsiveDaySize = inline ? undefined : 33;
  }
  return responsiveDaySize;
};

const getIcon = (type) => (
  <>
    {type === "leftChevron" && <ChevronLeft size={16} />}
    {type === "chevron" && <ChevronRight size={16} />}
  </>
);
const DatePicker = ({
  id,
  date,
  copy,
  onDateChange,
  isDayDisabled,
  inline,
  label,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", getResponsiveDaySize(inline));

    return () => {
      window.removeEventListener("resize", getResponsiveDaySize(inline));
    };
  }, [inline]);

  useEffect(() => {
    if (!isFocused) {
      labelRef.current.control.blur();
    }
  }, [isFocused]);

  const onFocusChange = ({ focused }) => {
    setIsFocused(focused);
  };

  const { className, style, ...propsWithoutStyling } = safeRest(props);

  const daySize = getResponsiveDaySize(inline)();
  return (
    <CalendarContainer {...safeRest(propsWithoutStyling)} daySize={daySize}>
      <label htmlFor={id} ref={labelRef}>
        <LabelText>{label}</LabelText>
        {inline && (
          <React.Fragment>
            <HiddenInputFieldContainer>
              <input
                id={id}
                type="text"
                value={date.format("YYYY-MM-DD") || ""}
                readOnly
              />
            </HiddenInputFieldContainer>
            <DayPickerSingleDateController
              date={date}
              onDateChange={onDateChange}
              focused={isFocused}
              onFocusChange={onFocusChange}
              numberOfMonths={1}
              hideKeyboardShortcutsPanel={true}
              keepOpenOnDateSelect={false}
              daySize={daySize}
              navPrev={getIcon("leftChevron")}
              navNext={getIcon("chevron")}
              isOutsideRange={isDayDisabled}
              phrases={getCopy(copyDictionary, copy)}
            />
          </React.Fragment>
        )}
        {!inline && (
          <SingleDatePicker
            id={id}
            date={date}
            onDateChange={onDateChange}
            focused={isFocused}
            onFocusChange={onFocusChange}
            numberOfMonths={1}
            hideKeyboardShortcutsPanel={true}
            displayFormat="DD / MM / YYYY"
            placeholder="DD / MM / YYYY"
            keepOpenOnDateSelect={false}
            daySize={daySize}
            navPrev={getIcon("leftChevron")}
            navNext={getIcon("chevron")}
            isOutsideRange={isDayDisabled}
            phrases={getCopy(copyDictionary, copy)}
          />
        )}
      </label>
    </CalendarContainer>
  );
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  copy: PropTypes.oneOf(["en", "fr"]).isRequired,
  date: momentPropTypes.momentObj,
  onDateChange: PropTypes.func,
  isDayDisabled: PropTypes.func,
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
};

DatePicker.defaultProps = {
  isDayDisabled: undefined,
  date: undefined,
  onDateChange: () => {},
  inline: false,
};

export default DatePicker;
