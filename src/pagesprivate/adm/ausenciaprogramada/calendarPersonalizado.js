import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarPersonalizado = ({ dayOff, onDaySelect }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        onDaySelect(day.dateString);
    };

    const markedDates = dayOff.reduce((acc, item) => {
        const startDate = new Date(item.data_inicial);
        const endDate = new Date(item.data_final);

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            if (d.getTime() === startDate.getTime()) {
                acc[dateStr] = { startingDay: true, color: '#e61919', textColor: 'white' };
            } else if (d.getTime() === endDate.getTime()) {
                acc[dateStr] = { endingDay: true, color: '#e61919', textColor: 'white' };
            } else {
                acc[dateStr] = { color: '#e61919', textColor: 'white' };
            }
        }
        return acc;
    }, {});

    if (selectedDate && !markedDates[selectedDate]) {
        markedDates[selectedDate] = {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#e91e63',
            selectedTextColor: '#fff'
        };
    }

    return (
        <Calendar
            current={new Date().toISOString().split('T')[0]}
            onDayPress={onDayPress}
            markedDates={markedDates}
            markingType={'period'}
            theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#1658c0',
                indicatorColor: '#1658c0',
                textDayFontFamily: 'monospace',
                textMonthFontFamily: 'monospace',
                textDayHeaderFontFamily: 'monospace',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
            }}
        />
    );
};

export default CalendarPersonalizado;
