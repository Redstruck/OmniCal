export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: 'DELETE_EVENT' | 'RESTORE_EVENT' | 'PERMANENT_DELETE';
  eventId: string;
  eventTitle: string;
  eventDate: Date;
  userId?: string; // In a real app, this would be the authenticated user ID
  details?: string;
}

class AuditLogger {
  private logs: AuditLogEntry[] = [];

  constructor() {
    this.loadLogs();
  }

  private loadLogs() {
    try {
      const savedLogs = localStorage.getItem('auditLogs');
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs);
        this.logs = parsedLogs.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
          eventDate: new Date(log.eventDate)
        }));
      }
    } catch (error) {
      console.error('Error loading audit logs:', error);
      this.logs = [];
    }
  }

  private saveLogs() {
    try {
      localStorage.setItem('auditLogs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Error saving audit logs:', error);
    }
  }

  logEventDeletion(eventId: string, eventTitle: string, eventDate: Date, details?: string) {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action: 'DELETE_EVENT',
      eventId,
      eventTitle,
      eventDate,
      userId: 'current-user', // In a real app, get from auth context
      details
    };

    this.logs.unshift(entry); // Add to beginning for chronological order
    this.saveLogs();
    
    console.log('Audit Log - Event Deleted:', entry);
  }

  logEventRestore(eventId: string, eventTitle: string, eventDate: Date) {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action: 'RESTORE_EVENT',
      eventId,
      eventTitle,
      eventDate,
      userId: 'current-user',
      details: 'Event restored via undo action'
    };

    this.logs.unshift(entry);
    this.saveLogs();
    
    console.log('Audit Log - Event Restored:', entry);
  }

  logPermanentDeletion(eventId: string, eventTitle: string, eventDate: Date) {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      action: 'PERMANENT_DELETE',
      eventId,
      eventTitle,
      eventDate,
      userId: 'current-user',
      details: 'Event permanently deleted after undo timeout'
    };

    this.logs.unshift(entry);
    this.saveLogs();
    
    console.log('Audit Log - Permanent Deletion:', entry);
  }

  getLogs(limit?: number): AuditLogEntry[] {
    return limit ? this.logs.slice(0, limit) : this.logs;
  }

  getLogsForEvent(eventId: string): AuditLogEntry[] {
    return this.logs.filter(log => log.eventId === eventId);
  }

  clearLogs() {
    this.logs = [];
    this.saveLogs();
  }
}

export const auditLogger = new AuditLogger();