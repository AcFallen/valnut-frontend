"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useUsersSelect } from "@/hooks/useUsers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./calendar-styles.css";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    appointmentId: string;
    patientId: string;
    patientName: string;
    nutritionistId: string;
    nutritionistName: string;
    consultationType: string;
    status: string;
    notes?: string;
    duration: number;
  };
}

interface AppointmentsCalendarProps {
  events: CalendarEvent[];
  isLoading: boolean;
  nutritionistId?: string;
  onDateSelect?: (selectInfo: any) => void;
  onEventClick?: (clickInfo: any) => void;
  onEventChange?: (changeInfo: any) => void;
  onNutritionistIdChange?: (nutritionistId: string) => void;
  onCreateAppointment?: () => void;
  className?: string;
}


const statusLabels = {
  scheduled: "Programada",
  confirmed: "Confirmada",
  in_progress: "En progreso",
  completed: "Completada",
  cancelled: "Cancelada",
  no_show: "No asistió",
};

export function AppointmentsCalendar({
  events,
  isLoading,
  nutritionistId,
  onDateSelect,
  onEventClick,
  onEventChange,
  onNutritionistIdChange,
  onCreateAppointment,
  className,
}: AppointmentsCalendarProps) {
  const [view, setView] = useState("timeGridWeek");
  const calendarRef = useRef<FullCalendar>(null);

  // Fetch nutritionists for filter
  const { data: users } = useUsersSelect();


  // Update calendar view when state changes - use setTimeout to avoid flushSync error
  useEffect(() => {
    if (calendarRef.current) {
      setTimeout(() => {
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          calendarApi.changeView(view);
        }
      }, 0);
    }
  }, [view]);

  // Navigate to first event date when events are loaded - use setTimeout to avoid flushSync error
  useEffect(() => {
    if (calendarRef.current && events && events.length > 0) {
      setTimeout(() => {
        if (calendarRef.current && events && events.length > 0) {
          const calendarApi = calendarRef.current.getApi();
          const firstEventDate = new Date(events[0].start);
          calendarApi.gotoDate(firstEventDate);
        }
      }, 100);
    }
  }, [events]);

  const handleDateSelect = useCallback(
    (selectInfo: any) => {
      onDateSelect?.(selectInfo);
    },
    [onDateSelect]
  );

  const handleEventClick = useCallback(
    (clickInfo: any) => {
      onEventClick?.(clickInfo);
    },
    [onEventClick]
  );

  const handleEventChange = useCallback(
    (changeInfo: any) => {
      onEventChange?.(changeInfo);
    },
    [onEventChange]
  );

  const eventContent = (eventInfo: any) => {
    const { extendedProps } = eventInfo.event;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-1 text-xs">
              <div className="font-medium truncate">
                {extendedProps.patientName}
              </div>
              <div className="text-xs opacity-90 truncate">
                {extendedProps.nutritionistName}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            className="bg-background border border-border text-foreground shadow-md p-2 text-xs max-w-xs"
          >
            <div className="space-y-1">
              <div className="font-medium">{extendedProps.patientName}</div>
              <div className="text-muted-foreground">{extendedProps.nutritionistName}</div>
              <div className="text-muted-foreground">{extendedProps.duration} min</div>
              <div className="text-muted-foreground">
                {statusLabels[extendedProps.status as keyof typeof statusLabels]}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  if (isLoading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendario de Citas
          </div>
          <div className="flex items-center gap-2">
            {onCreateAppointment && (
              <Button onClick={onCreateAppointment}>
                <Calendar className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            )}
            <Button
              variant={view === "timeGridWeek" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("timeGridWeek")}
            >
              Semana
            </Button>
            <Button
              variant={view === "timeGridDay" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("timeGridDay")}
            >
              Día
            </Button>
            <Button
              variant={view === "listWeek" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("listWeek")}
            >
              Lista
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        {onNutritionistIdChange && (
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Nutricionista:</label>
              <Select
                value={nutritionistId || "all"}
                onValueChange={(value) =>
                  onNutritionistIdChange(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Todos los nutricionistas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los nutricionistas</SelectItem>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {/* Color Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pb-3 border-b">
          <span className="font-medium">Estados:</span>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
            <span>Programada</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#059669' }}></div>
            <span>Confirmada</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>En progreso</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
            <span>Completada</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
            <span>Cancelada</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#64748b' }}></div>
            <span>No asistió</span>
          </div>
        </div>
        
        <div className="calendar-container">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
            initialView={view}
            locale="es"
            firstDay={1} // Lunes como primer día de la semana
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              list: "Lista",
            }}
            events={events}
            editable={false}
            selectable={!!onDateSelect}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
            eventContent={eventContent}
            height="auto"
            slotMinTime="07:00:00"
            slotMaxTime="22:00:00"
            slotDuration="00:30:00"
            allDaySlot={false}
            nowIndicator={true}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6],
              startTime: "08:00",
              endTime: "18:00",
            }}
            eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </CardContent>
    </Card>
  );
}