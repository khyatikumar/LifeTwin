import { TimelineEvent } from "../types";
import { apiRequest } from "./apiClient";
import { BackendTimelineEvent, fromBackendTimelineEvent, toBackendTimelineEvent, toBackendTimelineUpdate } from "./mappers";

export const timelineService = {
  async getEvents() {
    return (await apiRequest<BackendTimelineEvent[]>("/timeline"))
      .map(fromBackendTimelineEvent)
      .sort((a, b) => b.eventDate.localeCompare(a.eventDate));
  },
  async createEvent(event: Partial<TimelineEvent>) {
    return fromBackendTimelineEvent(await apiRequest<BackendTimelineEvent>("/timeline", "POST", { body: toBackendTimelineEvent(event) }));
  },
  async updateEvent(event: TimelineEvent) {
    return fromBackendTimelineEvent(await apiRequest<BackendTimelineEvent>(`/timeline/${event.id}`, "PUT", { body: toBackendTimelineUpdate(event) }));
  },
  deleteEvent(id: string) {
    return apiRequest<{ message: string }>(`/timeline/${id}`, "DELETE");
  },
};
