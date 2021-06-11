import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { CalendarEvents } from './CalendarEvents.js';

import moment from 'moment';
import 'moment/locale/es';
import '../../styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'; //Styles :V
import { messages } from '../../helpers/calendar-messajes-esp.js';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveNote, eventSetActive } from '../../actions/events';
import { AddNewFile } from '../ui/AddNewFile';
import { DeletedEventFab } from '../ui/DeletedEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);

	const [LastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelect = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		dispatch(eventClearActiveNote());
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};
		return {
			style,
		};
	};

	return (
		<div className="calendar--screen">
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChange}
				onSelectSlot={onSelectSlot}
				selectable={true}
				view={LastView}
				components={{
					event: CalendarEvents,
				}}
			/>

			<AddNewFile />
			{activeEvent && <DeletedEventFab />}

			<CalendarModal />
		</div>
	);
};
